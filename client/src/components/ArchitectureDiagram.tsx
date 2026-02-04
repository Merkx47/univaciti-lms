import { useState, useRef, useEffect, MouseEvent } from 'react';
import {
  Cloud, Database, Server, Globe, Shield, Lock, Users,
  Layers, Box, HardDrive, Cpu, Network, Zap, MessageSquare,
  Trash2, Download, RotateCcw, ZoomIn, ZoomOut, Move, Plus,
  ArrowRight, Circle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const THEME_PRIMARY = "#1E9AD6";

interface DiagramNode {
  id: string;
  type: string;
  x: number;
  y: number;
  label: string;
  color?: string;
}

interface DiagramConnection {
  id: string;
  from: string;
  to: string;
  label?: string;
  style?: 'solid' | 'dashed';
}

interface ArchitectureDiagramProps {
  title?: string;
  initialNodes?: DiagramNode[];
  initialConnections?: DiagramConnection[];
  readOnly?: boolean;
  className?: string;
}

// Available components for the diagram
const componentTypes = [
  { type: 'cloud', icon: Cloud, label: 'Cloud', color: '#3b82f6' },
  { type: 'server', icon: Server, label: 'Server', color: '#8b5cf6' },
  { type: 'database', icon: Database, label: 'Database', color: '#10b981' },
  { type: 'globe', icon: Globe, label: 'Internet', color: '#06b6d4' },
  { type: 'shield', icon: Shield, label: 'Firewall', color: '#ef4444' },
  { type: 'users', icon: Users, label: 'Users', color: '#f59e0b' },
  { type: 'layers', icon: Layers, label: 'Load Balancer', color: '#ec4899' },
  { type: 'box', icon: Box, label: 'Container', color: '#6366f1' },
  { type: 'storage', icon: HardDrive, label: 'Storage', color: '#14b8a6' },
  { type: 'compute', icon: Cpu, label: 'Compute', color: '#f97316' },
  { type: 'network', icon: Network, label: 'VPC/Network', color: '#84cc16' },
  { type: 'lambda', icon: Zap, label: 'Lambda/Function', color: '#eab308' },
  { type: 'queue', icon: MessageSquare, label: 'Queue/Events', color: '#a855f7' },
  { type: 'cache', icon: Circle, label: 'Cache/Redis', color: '#dc2626' },
];

const getIcon = (type: string) => {
  const found = componentTypes.find(c => c.type === type);
  return found ? found.icon : Box;
};

const getColor = (type: string) => {
  const found = componentTypes.find(c => c.type === type);
  return found ? found.color : '#6b7280';
};

export function ArchitectureDiagram({
  title = "Architecture Diagram",
  initialNodes = [],
  initialConnections = [],
  readOnly = false,
  className = "",
}: ArchitectureDiagramProps) {
  const [nodes, setNodes] = useState<DiagramNode[]>(initialNodes);
  const [connections, setConnections] = useState<DiagramConnection[]>(initialConnections);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [tool, setTool] = useState<'select' | 'connect' | 'pan'>('select');
  const canvasRef = useRef<HTMLDivElement>(null);

  // Add a new node
  const addNode = (type: string) => {
    const newNode: DiagramNode = {
      id: `node-${Date.now()}`,
      type,
      x: 200 + Math.random() * 200,
      y: 150 + Math.random() * 150,
      label: componentTypes.find(c => c.type === type)?.label || type,
      color: getColor(type),
    };
    setNodes([...nodes, newNode]);
  };

  // Delete selected node
  const deleteSelected = () => {
    if (selectedNode) {
      setNodes(nodes.filter(n => n.id !== selectedNode));
      setConnections(connections.filter(c => c.from !== selectedNode && c.to !== selectedNode));
      setSelectedNode(null);
    }
  };

  // Handle node mouse down
  const handleNodeMouseDown = (e: MouseEvent, nodeId: string) => {
    e.stopPropagation();

    if (tool === 'connect') {
      if (connectingFrom === null) {
        setConnectingFrom(nodeId);
      } else if (connectingFrom !== nodeId) {
        // Create connection
        const newConnection: DiagramConnection = {
          id: `conn-${Date.now()}`,
          from: connectingFrom,
          to: nodeId,
          style: 'solid',
        };
        setConnections([...connections, newConnection]);
        setConnectingFrom(null);
      }
    } else {
      setSelectedNode(nodeId);
      setDragging(nodeId);
      const node = nodes.find(n => n.id === nodeId);
      if (node && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setDragOffset({
          x: e.clientX - rect.left - node.x * zoom - pan.x,
          y: e.clientY - rect.top - node.y * zoom - pan.y,
        });
      }
    }
  };

  // Handle mouse move
  const handleMouseMove = (e: MouseEvent) => {
    if (dragging && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - dragOffset.x - pan.x) / zoom;
      const y = (e.clientY - rect.top - dragOffset.y - pan.y) / zoom;

      setNodes(nodes.map(n =>
        n.id === dragging ? { ...n, x: Math.max(0, x), y: Math.max(0, y) } : n
      ));
    }
  };

  // Handle mouse up
  const handleMouseUp = () => {
    setDragging(null);
  };

  // Handle canvas click
  const handleCanvasClick = () => {
    if (tool !== 'connect') {
      setSelectedNode(null);
    }
    setConnectingFrom(null);
  };

  // Update node label
  const updateNodeLabel = (nodeId: string, label: string) => {
    setNodes(nodes.map(n => n.id === nodeId ? { ...n, label } : n));
  };

  // Clear diagram
  const clearDiagram = () => {
    setNodes([]);
    setConnections([]);
    setSelectedNode(null);
  };

  // Export as SVG
  const exportAsSVG = () => {
    const svgContent = generateSVG();
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'architecture-diagram.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Generate SVG string
  const generateSVG = () => {
    const width = 800;
    const height = 600;

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;
    svg += `<rect width="100%" height="100%" fill="#1e293b"/>`;

    // Draw connections
    connections.forEach(conn => {
      const fromNode = nodes.find(n => n.id === conn.from);
      const toNode = nodes.find(n => n.id === conn.to);
      if (fromNode && toNode) {
        svg += `<line x1="${fromNode.x + 40}" y1="${fromNode.y + 40}" x2="${toNode.x + 40}" y2="${toNode.y + 40}" stroke="#64748b" stroke-width="2" ${conn.style === 'dashed' ? 'stroke-dasharray="5,5"' : ''}/>`;
      }
    });

    // Draw nodes
    nodes.forEach(node => {
      svg += `<rect x="${node.x}" y="${node.y}" width="80" height="80" rx="8" fill="${node.color}20" stroke="${node.color}" stroke-width="2"/>`;
      svg += `<text x="${node.x + 40}" y="${node.y + 95}" text-anchor="middle" fill="#e2e8f0" font-size="12">${node.label}</text>`;
    });

    svg += '</svg>';
    return svg;
  };

  // Load preset diagram
  const loadPreset = (preset: 'microservices' | 'serverless' | '3tier') => {
    const presets: Record<string, { nodes: DiagramNode[], connections: DiagramConnection[] }> = {
      microservices: {
        nodes: [
          { id: 'n1', type: 'users', x: 50, y: 200, label: 'Clients', color: '#f59e0b' },
          { id: 'n2', type: 'globe', x: 180, y: 200, label: 'API Gateway', color: '#06b6d4' },
          { id: 'n3', type: 'layers', x: 310, y: 100, label: 'Load Balancer', color: '#ec4899' },
          { id: 'n4', type: 'box', x: 450, y: 50, label: 'User Service', color: '#6366f1' },
          { id: 'n5', type: 'box', x: 450, y: 150, label: 'Order Service', color: '#6366f1' },
          { id: 'n6', type: 'box', x: 450, y: 250, label: 'Product Service', color: '#6366f1' },
          { id: 'n7', type: 'database', x: 600, y: 50, label: 'User DB', color: '#10b981' },
          { id: 'n8', type: 'database', x: 600, y: 150, label: 'Order DB', color: '#10b981' },
          { id: 'n9', type: 'database', x: 600, y: 250, label: 'Product DB', color: '#10b981' },
          { id: 'n10', type: 'queue', x: 310, y: 300, label: 'Event Bus', color: '#a855f7' },
        ],
        connections: [
          { id: 'c1', from: 'n1', to: 'n2' },
          { id: 'c2', from: 'n2', to: 'n3' },
          { id: 'c3', from: 'n3', to: 'n4' },
          { id: 'c4', from: 'n3', to: 'n5' },
          { id: 'c5', from: 'n3', to: 'n6' },
          { id: 'c6', from: 'n4', to: 'n7' },
          { id: 'c7', from: 'n5', to: 'n8' },
          { id: 'c8', from: 'n6', to: 'n9' },
          { id: 'c9', from: 'n4', to: 'n10', style: 'dashed' },
          { id: 'c10', from: 'n5', to: 'n10', style: 'dashed' },
          { id: 'c11', from: 'n6', to: 'n10', style: 'dashed' },
        ],
      },
      serverless: {
        nodes: [
          { id: 'n1', type: 'users', x: 50, y: 150, label: 'Users', color: '#f59e0b' },
          { id: 'n2', type: 'globe', x: 180, y: 150, label: 'CloudFront', color: '#06b6d4' },
          { id: 'n3', type: 'storage', x: 310, y: 50, label: 'S3 Static', color: '#14b8a6' },
          { id: 'n4', type: 'shield', x: 310, y: 150, label: 'API Gateway', color: '#ef4444' },
          { id: 'n5', type: 'lambda', x: 450, y: 100, label: 'Lambda Auth', color: '#eab308' },
          { id: 'n6', type: 'lambda', x: 450, y: 200, label: 'Lambda API', color: '#eab308' },
          { id: 'n7', type: 'database', x: 600, y: 150, label: 'DynamoDB', color: '#10b981' },
          { id: 'n8', type: 'queue', x: 450, y: 300, label: 'SQS Queue', color: '#a855f7' },
          { id: 'n9', type: 'lambda', x: 600, y: 300, label: 'Worker', color: '#eab308' },
        ],
        connections: [
          { id: 'c1', from: 'n1', to: 'n2' },
          { id: 'c2', from: 'n2', to: 'n3' },
          { id: 'c3', from: 'n2', to: 'n4' },
          { id: 'c4', from: 'n4', to: 'n5' },
          { id: 'c5', from: 'n4', to: 'n6' },
          { id: 'c6', from: 'n6', to: 'n7' },
          { id: 'c7', from: 'n6', to: 'n8', style: 'dashed' },
          { id: 'c8', from: 'n8', to: 'n9' },
        ],
      },
      '3tier': {
        nodes: [
          { id: 'n1', type: 'users', x: 50, y: 150, label: 'Users', color: '#f59e0b' },
          { id: 'n2', type: 'shield', x: 180, y: 150, label: 'WAF/CDN', color: '#ef4444' },
          { id: 'n3', type: 'layers', x: 310, y: 150, label: 'Load Balancer', color: '#ec4899' },
          { id: 'n4', type: 'server', x: 450, y: 80, label: 'Web Server 1', color: '#8b5cf6' },
          { id: 'n5', type: 'server', x: 450, y: 220, label: 'Web Server 2', color: '#8b5cf6' },
          { id: 'n6', type: 'layers', x: 580, y: 150, label: 'App LB', color: '#ec4899' },
          { id: 'n7', type: 'box', x: 700, y: 80, label: 'App Server 1', color: '#6366f1' },
          { id: 'n8', type: 'box', x: 700, y: 220, label: 'App Server 2', color: '#6366f1' },
          { id: 'n9', type: 'database', x: 850, y: 100, label: 'Primary DB', color: '#10b981' },
          { id: 'n10', type: 'database', x: 850, y: 200, label: 'Replica DB', color: '#10b981' },
          { id: 'n11', type: 'cache', x: 700, y: 320, label: 'Redis Cache', color: '#dc2626' },
        ],
        connections: [
          { id: 'c1', from: 'n1', to: 'n2' },
          { id: 'c2', from: 'n2', to: 'n3' },
          { id: 'c3', from: 'n3', to: 'n4' },
          { id: 'c4', from: 'n3', to: 'n5' },
          { id: 'c5', from: 'n4', to: 'n6' },
          { id: 'c6', from: 'n5', to: 'n6' },
          { id: 'c7', from: 'n6', to: 'n7' },
          { id: 'c8', from: 'n6', to: 'n8' },
          { id: 'c9', from: 'n7', to: 'n9' },
          { id: 'c10', from: 'n8', to: 'n9' },
          { id: 'c11', from: 'n9', to: 'n10', style: 'dashed' },
          { id: 'c12', from: 'n7', to: 'n11' },
          { id: 'c13', from: 'n8', to: 'n11' },
        ],
      },
    };

    const preset_data = presets[preset];
    if (preset_data) {
      setNodes(preset_data.nodes);
      setConnections(preset_data.connections);
    }
  };

  return (
    <div className={`bg-slate-900 rounded-lg border border-slate-700 overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-300">{title}</span>
        </div>

        {!readOnly && (
          <div className="flex items-center gap-2 flex-wrap">
            {/* Tool buttons */}
            <div className="flex items-center gap-1 border-r border-slate-600 pr-2">
              <Button
                size="sm"
                variant={tool === 'select' ? 'default' : 'ghost'}
                onClick={() => setTool('select')}
                className="h-7 px-2"
                title="Select & Move"
              >
                <Move className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant={tool === 'connect' ? 'default' : 'ghost'}
                onClick={() => { setTool('connect'); setConnectingFrom(null); }}
                className="h-7 px-2"
                title="Connect Nodes"
              >
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>

            {/* Preset buttons */}
            <div className="flex items-center gap-1 border-r border-slate-600 pr-2">
              <Button size="sm" variant="ghost" onClick={() => loadPreset('microservices')} className="h-7 px-2 text-xs">
                Microservices
              </Button>
              <Button size="sm" variant="ghost" onClick={() => loadPreset('serverless')} className="h-7 px-2 text-xs">
                Serverless
              </Button>
              <Button size="sm" variant="ghost" onClick={() => loadPreset('3tier')} className="h-7 px-2 text-xs">
                3-Tier
              </Button>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1">
              <Button size="sm" variant="ghost" onClick={clearDiagram} className="h-7 px-2 text-red-400 hover:text-red-300" title="Clear">
                <RotateCcw className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="ghost" onClick={exportAsSVG} className="h-7 px-2" title="Export SVG">
                <Download className="w-3 h-3" />
              </Button>
              {selectedNode && (
                <Button size="sm" variant="ghost" onClick={deleteSelected} className="h-7 px-2 text-red-400 hover:text-red-300" title="Delete Selected">
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Component palette */}
      {!readOnly && (
        <div className="flex items-center gap-1 px-4 py-2 bg-slate-800/50 border-b border-slate-700 overflow-x-auto">
          <span className="text-xs text-slate-500 mr-2">Add:</span>
          {componentTypes.map(comp => {
            const Icon = comp.icon;
            return (
              <button
                key={comp.type}
                onClick={() => addNode(comp.type)}
                className="flex items-center gap-1 px-2 py-1 rounded text-xs hover:bg-slate-700 transition-colors"
                style={{ color: comp.color }}
                title={comp.label}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{comp.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="relative h-96 overflow-hidden cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleCanvasClick}
        style={{
          backgroundImage: 'radial-gradient(circle, #374151 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        {/* SVG for connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
            </marker>
          </defs>
          {connections.map(conn => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const x1 = fromNode.x * zoom + pan.x + 40;
            const y1 = fromNode.y * zoom + pan.y + 40;
            const x2 = toNode.x * zoom + pan.x + 40;
            const y2 = toNode.y * zoom + pan.y + 40;

            return (
              <line
                key={conn.id}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#64748b"
                strokeWidth="2"
                strokeDasharray={conn.style === 'dashed' ? '5,5' : 'none'}
                markerEnd="url(#arrowhead)"
              />
            );
          })}

          {/* Connection preview line */}
          {connectingFrom && (
            <line
              x1={(nodes.find(n => n.id === connectingFrom)?.x || 0) * zoom + pan.x + 40}
              y1={(nodes.find(n => n.id === connectingFrom)?.y || 0) * zoom + pan.y + 40}
              x2={(nodes.find(n => n.id === connectingFrom)?.x || 0) * zoom + pan.x + 80}
              y2={(nodes.find(n => n.id === connectingFrom)?.y || 0) * zoom + pan.y + 40}
              stroke={THEME_PRIMARY}
              strokeWidth="2"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
          )}
        </svg>

        {/* Nodes */}
        {nodes.map(node => {
          const Icon = getIcon(node.type);
          const isSelected = selectedNode === node.id;
          const isConnecting = connectingFrom === node.id;

          return (
            <div
              key={node.id}
              className={`absolute flex flex-col items-center cursor-move transition-shadow ${
                isSelected ? 'z-10' : ''
              }`}
              style={{
                left: node.x * zoom + pan.x,
                top: node.y * zoom + pan.y,
                transform: `scale(${zoom})`,
                transformOrigin: 'top left',
              }}
              onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
            >
              <div
                className={`w-20 h-20 rounded-xl flex items-center justify-center transition-all ${
                  isSelected ? 'ring-2 ring-offset-2 ring-offset-slate-900' : ''
                } ${isConnecting ? 'animate-pulse' : ''}`}
                style={{
                  backgroundColor: `${node.color}20`,
                  borderWidth: 2,
                  borderColor: isSelected ? THEME_PRIMARY : node.color,
                  boxShadow: isSelected ? `0 0 20px ${THEME_PRIMARY}40` : 'none',
                }}
              >
                <Icon className="w-8 h-8" style={{ color: node.color }} />
              </div>
              {!readOnly && isSelected ? (
                <input
                  type="text"
                  value={node.label}
                  onChange={(e) => updateNodeLabel(node.id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-1 px-2 py-0.5 text-xs text-center bg-slate-800 border border-slate-600 rounded text-slate-200 w-24"
                />
              ) : (
                <span className="mt-1 text-xs text-slate-400 text-center max-w-24 truncate">
                  {node.label}
                </span>
              )}
            </div>
          );
        })}

        {/* Instructions */}
        {nodes.length === 0 && !readOnly && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-slate-500">
              <Layers className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Click components above to add them</p>
              <p className="text-xs mt-1">Or select a preset template</p>
            </div>
          </div>
        )}

        {/* Mode indicator */}
        {tool === 'connect' && (
          <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-slate-800 rounded-lg border border-slate-600 text-xs text-slate-300">
            {connectingFrom ? 'Click a node to connect' : 'Click first node to start connection'}
          </div>
        )}
      </div>
    </div>
  );
}

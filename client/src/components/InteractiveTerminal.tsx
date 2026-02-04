import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Terminal, ChevronRight, X, Minimize2, Maximize2 } from 'lucide-react';

interface TerminalCommand {
  command: string;
  output: string | string[];
  delay?: number;
}

interface InteractiveTerminalProps {
  title?: string;
  initialCommands?: TerminalCommand[];
  availableCommands?: Record<string, string | string[]>;
  prompt?: string;
  welcomeMessage?: string;
  className?: string;
}

const THEME_PRIMARY = "#1E9AD6";

// Default commands available in all terminals
const defaultCommands: Record<string, string | string[]> = {
  'help': [
    'Available commands:',
    '  help     - Show this help message',
    '  clear    - Clear the terminal',
    '  whoami   - Display current user',
    '  date     - Display current date and time',
    '  echo     - Print text to terminal',
    '  history  - Show command history',
  ],
  'whoami': 'student@univaciti',
  'date': () => new Date().toString(),
  'pwd': '/home/student/workspace',
  'ls': ['Documents', 'Downloads', 'Projects', 'README.md'],
  'ls -la': [
    'total 24',
    'drwxr-xr-x  6 student student 4096 Feb  4 10:00 .',
    'drwxr-xr-x  3 root    root    4096 Feb  1 08:00 ..',
    '-rw-r--r--  1 student student  220 Feb  1 08:00 .bash_profile',
    'drwxr-xr-x  2 student student 4096 Feb  2 14:30 Documents',
    'drwxr-xr-x  2 student student 4096 Feb  3 09:15 Downloads',
    'drwxr-xr-x  5 student student 4096 Feb  4 10:00 Projects',
    '-rw-r--r--  1 student student 1024 Feb  4 09:00 README.md',
  ],
  'cat README.md': [
    '# Welcome to Univaciti Learning Environment',
    '',
    'This is your personal workspace for hands-on exercises.',
    'Feel free to experiment with commands!',
  ],
};

// Cloud Engineering specific commands
const cloudCommands: Record<string, string | string[]> = {
  'aws --version': 'aws-cli/2.15.0 Python/3.11.6 Linux/5.15.0-1052-aws exe/x86_64.ubuntu.22',
  'aws configure list': [
    '      Name                    Value             Type    Location',
    '      ----                    -----             ----    --------',
    '   profile                <not set>             None    None',
    'access_key     ****************DEMO shared-credentials-file',
    'secret_key     ****************DEMO shared-credentials-file',
    '    region                us-east-1      config-file    ~/.aws/config',
  ],
  'aws s3 ls': [
    '2024-01-15 10:30:00 my-learning-bucket',
    '2024-01-20 14:45:00 demo-static-website',
    '2024-02-01 09:00:00 terraform-state-bucket',
  ],
  'aws ec2 describe-instances --query "Reservations[*].Instances[*].[InstanceId,State.Name,InstanceType]" --output table': [
    '--------------------------------------------',
    '|           DescribeInstances              |',
    '+----------------------+---------+---------+',
    '|  i-0abc123def456789  | running | t2.micro|',
    '|  i-0def789abc123456  | stopped | t3.small|',
    '+----------------------+---------+---------+',
  ],
  'terraform --version': [
    'Terraform v1.7.0',
    'on linux_amd64',
  ],
  'terraform init': [
    'Initializing the backend...',
    '',
    'Initializing provider plugins...',
    '- Finding hashicorp/aws versions matching "~> 5.0"...',
    '- Installing hashicorp/aws v5.31.0...',
    '- Installed hashicorp/aws v5.31.0 (signed by HashiCorp)',
    '',
    'Terraform has been successfully initialized!',
  ],
  'terraform plan': [
    'Refreshing Terraform state in-memory prior to plan...',
    '',
    'Terraform will perform the following actions:',
    '',
    '  # aws_instance.web will be created',
    '  + resource "aws_instance" "web" {',
    '      + ami                          = "ami-0c55b159cbfafe1f0"',
    '      + instance_type                = "t2.micro"',
    '      + tags                         = {',
    '          + "Name" = "web-server"',
    '        }',
    '    }',
    '',
    'Plan: 1 to add, 0 to change, 0 to destroy.',
  ],
  'docker --version': 'Docker version 24.0.7, build afdd53b',
  'docker ps': [
    'CONTAINER ID   IMAGE          COMMAND                  STATUS          PORTS                    NAMES',
    'a1b2c3d4e5f6   nginx:latest   "/docker-entrypoint.…"   Up 2 hours      0.0.0.0:80->80/tcp       web-server',
    'f6e5d4c3b2a1   redis:alpine   "docker-entrypoint.s…"   Up 3 hours      0.0.0.0:6379->6379/tcp   redis-cache',
  ],
  'docker images': [
    'REPOSITORY   TAG       IMAGE ID       CREATED        SIZE',
    'nginx        latest    a8758716bb6a   2 weeks ago    187MB',
    'redis        alpine    3900abf41552   3 weeks ago    40.1MB',
    'node         18        b4646c43b5db   1 month ago    1.1GB',
    'python       3.11      22140cbb3b0c   1 month ago    1.01GB',
  ],
  'kubectl version --client': 'Client Version: v1.29.0',
  'kubectl get nodes': [
    'NAME                 STATUS   ROLES           AGE   VERSION',
    'control-plane-01     Ready    control-plane   30d   v1.29.0',
    'worker-node-01       Ready    <none>          30d   v1.29.0',
    'worker-node-02       Ready    <none>          30d   v1.29.0',
  ],
  'kubectl get pods': [
    'NAME                          READY   STATUS    RESTARTS   AGE',
    'nginx-deployment-6b474476c4   1/1     Running   0          2d',
    'redis-master-0                1/1     Running   0          5d',
    'api-server-7d8f9c6b5f-x2k9m   1/1     Running   0          1d',
  ],
  'ping google.com': [
    'PING google.com (142.250.185.78) 56(84) bytes of data.',
    '64 bytes from lga25s71-in-f14.1e100.net (142.250.185.78): icmp_seq=1 ttl=117 time=12.3 ms',
    '64 bytes from lga25s71-in-f14.1e100.net (142.250.185.78): icmp_seq=2 ttl=117 time=11.8 ms',
    '64 bytes from lga25s71-in-f14.1e100.net (142.250.185.78): icmp_seq=3 ttl=117 time=12.1 ms',
    '',
    '--- google.com ping statistics ---',
    '3 packets transmitted, 3 received, 0% packet loss, time 2003ms',
    'rtt min/avg/max/mdev = 11.800/12.067/12.300/0.205 ms',
  ],
  'ssh ec2-user@10.0.1.50': [
    'The authenticity of host \'10.0.1.50\' can\'t be established.',
    'ED25519 key fingerprint is SHA256:abc123def456...',
    'Are you sure you want to continue connecting (yes/no)? yes',
    'Warning: Permanently added \'10.0.1.50\' (ED25519) to the list of known hosts.',
    '',
    '       __|  __|_  )',
    '       _|  (     /   Amazon Linux 2 AMI',
    '      ___|\___|___|',
    '',
    '[ec2-user@ip-10-0-1-50 ~]$ ',
  ],
};

// Data Analytics specific commands
const dataCommands: Record<string, string | string[]> = {
  'python --version': 'Python 3.11.6',
  'pip list': [
    'Package         Version',
    '--------------- -------',
    'numpy           1.26.3',
    'pandas          2.1.4',
    'matplotlib      3.8.2',
    'scikit-learn    1.3.2',
    'jupyter         1.0.0',
    'seaborn         0.13.1',
  ],
  'python': [
    'Python 3.11.6 (main, Nov 14 2023, 09:36:21) [GCC 11.4.0] on linux',
    'Type "help", "copyright", "credits" or "license" for more information.',
    '>>> ',
  ],
  'python -c "import pandas as pd; print(pd.__version__)"': '2.1.4',
  'jupyter notebook --version': '7.0.6',
  'psql --version': 'psql (PostgreSQL) 15.4',
  'psql -U analyst -d sales_db -c "SELECT COUNT(*) FROM orders;"': [
    ' count  ',
    '--------',
    ' 125430',
    '(1 row)',
  ],
  'psql -U analyst -d sales_db -c "SELECT region, SUM(amount) as total FROM orders GROUP BY region ORDER BY total DESC LIMIT 5;"': [
    '  region   |   total    ',
    '-----------+------------',
    ' Lagos     | 45,230,000',
    ' Abuja     | 32,150,000',
    ' Kano      | 18,750,000',
    ' Port Harcourt | 15,420,000',
    ' Ibadan    | 12,890,000',
    '(5 rows)',
  ],
};

// React/Software specific commands
const softwareCommands: Record<string, string | string[]> = {
  'node --version': 'v20.10.0',
  'npm --version': '10.2.5',
  'npx create-react-app --version': '5.0.1',
  'npm init -y': [
    'Wrote to /home/student/workspace/package.json:',
    '{',
    '  "name": "my-project",',
    '  "version": "1.0.0",',
    '  "description": "",',
    '  "main": "index.js",',
    '  "scripts": {',
    '    "test": "echo \\"Error: no test specified\\" && exit 1"',
    '  },',
    '  "keywords": [],',
    '  "author": "",',
    '  "license": "ISC"',
    '}',
  ],
  'npm install': [
    'added 1423 packages, and audited 1424 packages in 45s',
    '',
    '231 packages are looking for funding',
    '  run `npm fund` for details',
    '',
    'found 0 vulnerabilities',
  ],
  'npm run dev': [
    '',
    '> my-app@0.1.0 dev',
    '> next dev',
    '',
    '   ▲ Next.js 14.1.0',
    '   - Local:        http://localhost:3000',
    '   - Environments: .env.local',
    '',
    ' ✓ Ready in 2.3s',
  ],
  'npm test': [
    'PASS  src/App.test.tsx',
    '  ✓ renders learn react link (23 ms)',
    '',
    'Test Suites: 1 passed, 1 total',
    'Tests:       1 passed, 1 total',
    'Snapshots:   0 total',
    'Time:        1.234 s',
  ],
  'git status': [
    'On branch main',
    'Your branch is up to date with \'origin/main\'.',
    '',
    'Changes not staged for commit:',
    '  (use "git add <file>..." to update what will be committed)',
    '  (use "git restore <file>..." to discard changes)',
    '        modified:   src/App.tsx',
    '',
    'no changes added to commit (use "git add" and/or "git commit -a")',
  ],
  'git log --oneline -5': [
    'f77d399 Fix bullet point visibility',
    'c28cc5b Add dynamic course content',
    'b4b6cad Transitioned from Plan to Build mode',
    'e845abc Published your App',
    'cd39cfb Published your App',
  ],
  'java --version': [
    'openjdk 21 2023-09-19',
    'OpenJDK Runtime Environment (build 21+35)',
    'OpenJDK 64-Bit Server VM (build 21+35, mixed mode, sharing)',
  ],
  'mvn --version': [
    'Apache Maven 3.9.6',
    'Maven home: /usr/share/maven',
    'Java version: 21, vendor: Ubuntu',
  ],
  './mvnw spring-boot:run': [
    '  .   ____          _            __ _ _',
    ' /\\\\ / ___\'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\',
    '( ( )\\___ | \'_ | \'_| | \'_ \\/ _` | \\ \\ \\ \\',
    ' \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )',
    '  \'  |____| .__|_| |_|_| |_\\__, | / / / /',
    ' =========|_|==============|___/=/_/_/_/',
    ' :: Spring Boot ::                (v3.2.1)',
    '',
    '2024-02-04 10:00:00.000  INFO --- Starting Application',
    '2024-02-04 10:00:02.000  INFO --- Started Application in 2.345 seconds',
    '2024-02-04 10:00:02.001  INFO --- Tomcat started on port(s): 8080 (http)',
  ],
};

// QA Testing specific commands
const qaCommands: Record<string, string | string[]> = {
  'npx cypress --version': [
    'Cypress package version: 13.6.2',
    'Cypress binary version: 13.6.2',
    'Electron version: 25.8.4',
    'Bundled Node version: 18.15.0',
  ],
  'npx cypress run': [
    '====================================================================================================',
    '',
    '  (Run Starting)',
    '',
    '  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐',
    '  │ Cypress:        13.6.2                                                                        │',
    '  │ Browser:        Electron 118 (headless)                                                       │',
    '  │ Specs:          3 found (login.cy.ts, checkout.cy.ts, api.cy.ts)                             │',
    '  └────────────────────────────────────────────────────────────────────────────────────────────────┘',
    '',
    '  Running:  login.cy.ts',
    '    ✓ should login with valid credentials (1234ms)',
    '    ✓ should show error for invalid password (892ms)',
    '    ✓ should redirect to dashboard after login (1567ms)',
    '',
    '  3 passing (4s)',
    '',
    '  (Results)',
    '  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐',
    '  │ Tests:        3                                                                               │',
    '  │ Passing:      3                                                                               │',
    '  │ Failing:      0                                                                               │',
    '  │ Duration:     4 seconds                                                                       │',
    '  └────────────────────────────────────────────────────────────────────────────────────────────────┘',
  ],
  'npx jest --coverage': [
    'PASS  tests/unit/utils.test.ts',
    'PASS  tests/unit/validators.test.ts',
    'PASS  tests/unit/api.test.ts',
    '',
    '----------|---------|----------|---------|---------|',
    'File      | % Stmts | % Branch | % Funcs | % Lines |',
    '----------|---------|----------|---------|---------|',
    'All files |   94.23 |    87.50 |   91.67 |   94.12 |',
    ' utils.ts |   95.45 |    90.00 |  100.00 |   95.45 |',
    ' api.ts   |   92.31 |    85.71 |   83.33 |   92.00 |',
    '----------|---------|----------|---------|---------|',
    '',
    'Test Suites: 3 passed, 3 total',
    'Tests:       15 passed, 15 total',
  ],
  'newman run collection.json': [
    'newman',
    '',
    'API Test Collection',
    '',
    '→ Login',
    '  POST http://localhost:3000/api/auth/login [200 OK, 1.23kB, 145ms]',
    '  ✓  Status code is 200',
    '  ✓  Response has token',
    '',
    '→ Get Users',
    '  GET http://localhost:3000/api/users [200 OK, 5.67kB, 89ms]',
    '  ✓  Status code is 200',
    '  ✓  Response is array',
    '',
    '┌─────────────────────────┬──────────────────┬──────────────────┐',
    '│                         │         executed │           failed │',
    '├─────────────────────────┼──────────────────┼──────────────────┤',
    '│              iterations │                1 │                0 │',
    '│                requests │                5 │                0 │',
    '│            test-scripts │               10 │                0 │',
    '│              assertions │               12 │                0 │',
    '└─────────────────────────┴──────────────────┴──────────────────┘',
  ],
  'selenium-side-runner test.side': [
    'Running test.side',
    '  Login Test Suite',
    '    ✓ Valid Login Test (2.345s)',
    '    ✓ Invalid Login Test (1.234s)',
    '    ✓ Forgot Password Test (1.567s)',
    '',
    '3 passing (5.146s)',
  ],
};

// AI/ML specific commands
const mlCommands: Record<string, string | string[]> = {
  'python -c "import tensorflow as tf; print(tf.__version__)"': '2.15.0',
  'python -c "import torch; print(torch.__version__)"': '2.1.2',
  'nvidia-smi': [
    '+-----------------------------------------------------------------------------+',
    '| NVIDIA-SMI 535.129.03   Driver Version: 535.129.03   CUDA Version: 12.2     |',
    '|-------------------------------+----------------------+----------------------+',
    '| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |',
    '| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |',
    '|===============================+======================+======================|',
    '|   0  Tesla T4            On   | 00000000:00:1E.0 Off |                    0 |',
    '| N/A   42C    P0    27W /  70W |   1234MiB / 15360MiB |     15%      Default |',
    '+-------------------------------+----------------------+----------------------+',
  ],
  'python train.py': [
    'Loading dataset...',
    'Training samples: 50000, Validation samples: 10000',
    '',
    'Epoch 1/10',
    '1563/1563 [==============================] - 45s 29ms/step - loss: 1.4523 - accuracy: 0.4732 - val_loss: 1.1234 - val_accuracy: 0.6012',
    'Epoch 2/10',
    '1563/1563 [==============================] - 43s 28ms/step - loss: 1.0234 - accuracy: 0.6345 - val_loss: 0.9876 - val_accuracy: 0.6543',
    'Epoch 3/10',
    '1563/1563 [==============================] - 42s 27ms/step - loss: 0.8765 - accuracy: 0.6923 - val_loss: 0.8543 - val_accuracy: 0.7012',
    '...',
    'Model saved to: models/classifier_v1.h5',
    'Final accuracy: 89.45%',
  ],
  'jupyter lab': [
    '[I 2024-02-04 10:00:00.000 ServerApp] jupyter_lsp | extension was successfully linked.',
    '[I 2024-02-04 10:00:00.100 ServerApp] jupyter_server_terminals | extension was successfully linked.',
    '[I 2024-02-04 10:00:00.200 ServerApp] jupyterlab | extension was successfully linked.',
    '[I 2024-02-04 10:00:01.000 ServerApp] Serving notebooks from local directory: /home/student/workspace',
    '[I 2024-02-04 10:00:01.000 ServerApp] Jupyter Server is running at:',
    '[I 2024-02-04 10:00:01.000 ServerApp] http://localhost:8888/lab?token=abc123...',
  ],
  'mlflow ui': [
    '[2024-02-04 10:00:00 +0000] [12345] [INFO] Starting MLflow UI',
    '[2024-02-04 10:00:00 +0000] [12345] [INFO] Listening at: http://127.0.0.1:5000',
    '[2024-02-04 10:00:00 +0000] [12345] [INFO] Tracking URI: ./mlruns',
  ],
};

// Get commands based on specialization
const getCommandsForSpecialization = (specialization?: string): Record<string, string | string[]> => {
  switch (specialization) {
    case 'cloud-engineering':
      return { ...defaultCommands, ...cloudCommands };
    case 'data-analytics':
      return { ...defaultCommands, ...dataCommands };
    case 'software-java':
    case 'software-react':
      return { ...defaultCommands, ...softwareCommands };
    case 'quality-assurance':
      return { ...defaultCommands, ...qaCommands };
    case 'ai-ml':
      return { ...defaultCommands, ...mlCommands };
    case 'solutions-architecture':
      return { ...defaultCommands, ...cloudCommands, ...softwareCommands };
    default:
      return { ...defaultCommands, ...cloudCommands, ...softwareCommands };
  }
};

interface HistoryEntry {
  type: 'input' | 'output';
  content: string;
  timestamp: Date;
}

export function InteractiveTerminal({
  title = "Terminal",
  initialCommands = [],
  availableCommands,
  prompt = "student@univaciti:~$",
  welcomeMessage = "Welcome to Univaciti Interactive Terminal. Type 'help' for available commands.",
  className = "",
}: InteractiveTerminalProps) {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: 'output', content: welcomeMessage, timestamp: new Date() }
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = availableCommands || getCommandsForSpecialization();

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on click
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  // Process command
  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();

    if (!trimmedCmd) return;

    // Add command to history
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Add input to display
    setHistory(prev => [...prev, {
      type: 'input',
      content: `${prompt} ${trimmedCmd}`,
      timestamp: new Date()
    }]);

    // Handle special commands
    if (trimmedCmd === 'clear') {
      setHistory([{ type: 'output', content: welcomeMessage, timestamp: new Date() }]);
      return;
    }

    if (trimmedCmd === 'history') {
      const historyOutput = commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`).join('\n');
      setHistory(prev => [...prev, {
        type: 'output',
        content: historyOutput || 'No commands in history',
        timestamp: new Date()
      }]);
      return;
    }

    // Handle echo command
    if (trimmedCmd.startsWith('echo ')) {
      const text = trimmedCmd.substring(5);
      setHistory(prev => [...prev, {
        type: 'output',
        content: text,
        timestamp: new Date()
      }]);
      return;
    }

    // Look up command
    let output: string | string[] | undefined;

    // Check exact match first
    if (commands[trimmedCmd]) {
      output = commands[trimmedCmd];
    } else {
      // Check for partial matches (e.g., "ping anything" should work)
      for (const key of Object.keys(commands)) {
        if (trimmedCmd.startsWith(key.split(' ')[0]) && key.includes(' ')) {
          output = commands[key];
          break;
        }
      }
    }

    if (output) {
      const outputStr = Array.isArray(output) ? output.join('\n') : output;
      setHistory(prev => [...prev, {
        type: 'output',
        content: outputStr,
        timestamp: new Date()
      }]);
    } else {
      setHistory(prev => [...prev, {
        type: 'output',
        content: `bash: ${trimmedCmd.split(' ')[0]}: command not found\nType 'help' to see available commands.`,
        timestamp: new Date()
      }]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion
      const matches = Object.keys(commands).filter(cmd =>
        cmd.startsWith(currentInput) && cmd !== currentInput
      );
      if (matches.length === 1) {
        setCurrentInput(matches[0]);
      } else if (matches.length > 1) {
        setHistory(prev => [...prev, {
          type: 'output',
          content: matches.join('  '),
          timestamp: new Date()
        }]);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([{ type: 'output', content: welcomeMessage, timestamp: new Date() }]);
    }
  };

  if (isMinimized) {
    return (
      <div className={`bg-slate-900 rounded-lg border border-slate-700 ${className}`}>
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 rounded-t-lg border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-slate-300">{title}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(false)}
              className="p-1 hover:bg-slate-700 rounded transition-colors"
            >
              <Maximize2 className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-slate-900 rounded-lg border border-slate-700 overflow-hidden ${isMaximized ? 'fixed inset-4 z-50' : ''} ${className}`}>
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-green-400" />
          <span className="text-sm font-medium text-slate-300">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 hover:bg-slate-700 rounded transition-colors"
            title="Minimize"
          >
            <Minimize2 className="w-3 h-3 text-slate-400" />
          </button>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1 hover:bg-slate-700 rounded transition-colors"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            <Maximize2 className="w-3 h-3 text-slate-400" />
          </button>
          {isMaximized && (
            <button
              onClick={() => setIsMaximized(false)}
              className="p-1 hover:bg-slate-700 rounded transition-colors"
              title="Close"
            >
              <X className="w-3 h-3 text-slate-400" />
            </button>
          )}
        </div>
      </div>

      {/* Terminal content */}
      <div
        ref={terminalRef}
        className={`font-mono text-sm p-4 overflow-y-auto ${isMaximized ? 'h-[calc(100%-40px)]' : 'h-80'}`}
        onClick={handleTerminalClick}
      >
        {history.map((entry, i) => (
          <div key={i} className={`whitespace-pre-wrap ${entry.type === 'input' ? 'text-green-400' : 'text-slate-300'}`}>
            {entry.content}
          </div>
        ))}

        {/* Current input line */}
        <div className="flex items-center text-green-400">
          <span>{prompt}&nbsp;</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}

export { getCommandsForSpecialization };

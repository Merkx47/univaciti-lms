const toolLogos: Record<string, string> = {
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "TensorFlow": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  "PyTorch": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  "Jupyter": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
  "Scikit-learn": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
  "Hugging Face": "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
  "Excel": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg",
  "Pandas": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  "NumPy": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  "Tableau": "https://cdn.worldvectorlogo.com/logos/tableau-software.svg",
  "Power BI": "https://cdn.worldvectorlogo.com/logos/power-bi.svg",
  "Selenium": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
  "Cypress": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg",
  "Postman": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  "JMeter": "https://jmeter.apache.org/images/jmeter_square.svg",
  "Cucumber": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cucumber/cucumber-plain.svg",
  "Jenkins": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
  "JIRA": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
  "Java 17+": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "Spring Boot": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  "Hibernate": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg",
  "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "Maven": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg",
  "JUnit": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/junit/junit-original.svg",
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Redux": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "Jest": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "AWS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "Azure": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  "Terraform": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
  "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "Kubernetes": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg",
  "Confluence": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg",
};

interface ToolLogoProps {
  name: string;
  className?: string;
}

export function ToolLogo({ name, className = "" }: ToolLogoProps) {
  const logoUrl = toolLogos[name];
  
  return (
    <div className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 border border-border/50 hover:border-primary/30 transition-colors ${className}`}>
      {logoUrl ? (
        <img 
          src={logoUrl} 
          alt={`${name} logo`}
          className="w-10 h-10 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <span className="text-lg font-bold text-primary">{name.charAt(0)}</span>
        </div>
      )}
      <span className="text-sm font-medium text-foreground">{name}</span>
    </div>
  );
}

interface ToolsGridProps {
  tools: string[];
}

export function ToolsGrid({ tools }: ToolsGridProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
      {tools.map((tool, index) => (
        <ToolLogo key={index} name={tool} />
      ))}
    </div>
  );
}

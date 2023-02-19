export const Feature: React.FC<{
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}> = ({ icon, title, content }) => (
  <div className="feature text-center">
    <div className="feature-inner">
      {icon}
      <h4 className="h3-mobile mb-8">{title}</h4>
      <p className="relative text-sm">{content}</p>
    </div>
  </div>
);



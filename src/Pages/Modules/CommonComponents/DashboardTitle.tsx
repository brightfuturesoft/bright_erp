const DashboardTitle: React.FC = ({ title }) => {
  return (
    <h1 className="font-semibold text-light-dark text-xl dark:text-gray-300">
      {title}
    </h1>
  );
};

export default DashboardTitle;

const DashboardHeader: React.FC = ({ children }) => {
  return (
    <div className="flex justify-between items-center border-gray-200 dark:border-gray-800 mt-1 px-2 pb-4 border-b">
      {children}
    </div>
  );
};

export default DashboardHeader;

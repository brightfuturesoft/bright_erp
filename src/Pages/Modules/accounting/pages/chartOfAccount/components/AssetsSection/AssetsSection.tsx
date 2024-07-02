import BankTable from "./BankTable";
import CashTable from "./CashTable";
import CurrentAssets from "./CurrentAssets";
import DepreciationTable from "./DepreciationTable";
import InventoryTable from "./InventoryTable";
import MobileBankTable from "./MobileBankTable";
import MonyTransit from "./MonyTransit";
import LongTermAssets from "./LongTermAssets";
import ShortTermAssets from "./ShortTermAssets";

const AssetsSection: React.FC = () => {
  const data = {
    bankTable: {
      label: "Bank",
      data: [
        {
          amount: 5000,
          ac_name: "Ferdaos",
          description: "this is a description",
          status: true,
          date: "2020-01-01",
          category: "bank",
        },
        {
          amount: 2500,
          ac_name: "Akbar",
          description: "second entry",
          status: true,
          date: "2020-02-01",
          category: "bank",
        },
        {
          amount: 3200,
          ac_name: "Latif",
          description: "third entry",
          status: false,
          date: "2020-03-01",
          category: "bank",
        },
        {
          amount: 4100,
          ac_name: "Nadia",
          description: "fourth entry",
          status: true,
          date: "2020-04-01",
          category: "bank",
        },
        {
          amount: 2800,
          ac_name: "Omar",
          description: "fifth entry",
          status: false,
          date: "2020-05-01",
          category: "bank",
        },
        {
          amount: 3600,
          ac_name: "Rahim",
          description: "sixth entry",
          status: true,
          date: "2020-06-01",
          category: "bank",
        },
      ],
    },
    cashTable: {
      label: "Cash",
      data: [
        {
          amount: 2800,
          ac_name: "Omar",
          description: "fifth entry",
          status: false,
          date: "2020-05-01",
          category: "cash",
        },
        {
          amount: 3600,
          ac_name: "Rahim",
          description: "sixth entry",
          status: true,
          date: "2020-06-01",
          category: "cash",
        },
      ],
    },
    currentAssetsTable: {
      label: "Current Assets",
      data: [
        {
          amount: 2800,
          ac_name: "Omar",
          description: "fifth entry",
          status: false,
          date: "2020-05-01",
          category: "current assets",
        },
      ],
    },
    depreciationTable: {
      label: "Depreciation",
      data: [
        {
          amount: 1500,
          ac_name: "Saima",
          description: "seventh entry",
          status: true,
          date: "2020-07-01",
          category: "depreciation",
        },
        {
          amount: 1800,
          ac_name: "Jamal",
          description: "eighth entry",
          status: true,
          date: "2020-08-01",
          category: "depreciation",
        },
        {
          amount: 2100,
          ac_name: "Fatima",
          description: "ninth entry",
          status: false,
          date: "2020-09-01",
          category: "depreciation",
        },
        {
          amount: 2400,
          ac_name: "Hassan",
          description: "tenth entry",
          status: true,
          date: "2020-10-01",
          category: "depreciation",
        },
      ],
    },
    inventoryTable: {
      label: "Inventory",
      data: [
        {
          amount: 2800,
          ac_name: "Omar",
          description: "fifth entry",
          status: false,
          date: "2020-05-01",
          category: "inventory",
        },
      ],
    },
    mobileBankTable: {
      label: "Mobile Bank",
      data: [
        {
          amount: 2800,
          ac_name: "Omar",
          description: "fifth entry",
          status: false,
          date: "2020-05-01",
          category: "mobileBank",
        },
      ],
    },
    monyTransitTable: {
      label: "Money Transit",
      data: [
        {
          amount: 2800,
          ac_name: "Omar",
          description: "fifth entry",
          status: false,
          date: "2020-05-01",
          category: "monyTransit",
        },
      ],
    },
    longTermAssetsTable: {
      label: "Long Term Assets",
      data: [
        {
          amount: 2800,
          ac_name: "Omar",
          description: "fifth entry",
          status: false,
          date: "2020-05-01",
          category: "long term asset",
        },
      ],
    },
    shortTermAssetsTable: {
      label: "Short Term Assets",
      data: [
        {
          amount: 2800,
          ac_name: "Omar",
          description: "fifth entry",
          status: false,
          date: "2020-05-01",
          category: "short term assets",
        },
      ],
    },
  };

  return (
    <div className="w-[92vw] md:w-full">
      <BankTable data={data?.bankTable} />
      <br />
      <CashTable data={data?.cashTable} />
      <br />
      <CurrentAssets data={data?.currentAssetsTable} />
      <br />
      <DepreciationTable data={data?.depreciationTable} />
      <br />
      <InventoryTable data={data?.inventoryTable} />
      <br />
      <MobileBankTable data={data?.mobileBankTable} />
      <br />
      <MonyTransit data={data?.monyTransitTable} />
      <br />
      <LongTermAssets data={data?.longTermAssetsTable} />
      <ShortTermAssets data={data?.shortTermAssetsTable} />
    </div>
  );
};

export default AssetsSection;

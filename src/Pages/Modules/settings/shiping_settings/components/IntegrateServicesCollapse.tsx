import { IntegrateServicesProps } from '../Data_Type';
import { CustomCollapse } from './CustomCollapse';
import { CustomRadio } from './CustomRadio';
import { PathaoSection } from './PathaoSection';
import { SteedfastSection } from './SteedfastSection';

export const IntegrateServicesCollapse: React.FC<IntegrateServicesProps> = ({
    couriers,
    selectedCourier,
    onSelectCourier,
    apiKey,
    setApiKey,
    apiSecret,
    setApiSecret,
    pathaoBaseUrl,
    setPathaoBaseUrl,
    pathaoClientId,
    setPathaoClientId,
    pathaoClientSecret,
    setPathaoClientSecret,
    user,
    fetchSettings,
}) => {
    const isStedfastSelected = selectedCourier === 'STEADFAST';
    const isPathaoSelected = selectedCourier === 'PATHAO';
    const isRedxSelected = selectedCourier === 'REDX';
    const isPaperflySelected = selectedCourier === 'PAPERFLY';

    const recommendedCourier = couriers.find(c => c.id === 'STEADFAST');
    const otherCouriers = couriers.filter(c => c.id !== 'RX');

    return (
        <CustomCollapse
            title="Integrate Delivery Services"
            defaultOpen={true}
        >
            {recommendedCourier && (
                <CustomRadio
                    courier={recommendedCourier}
                    isSelected={isStedfastSelected}
                    onSelect={onSelectCourier}
                />
            )}
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-6 mb-3">
                Other Courier Services:
            </h3>
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-start">
                {otherCouriers.map(c => (
                    <CustomRadio
                        key={c.id}
                        courier={c}
                        isSelected={selectedCourier === c.id}
                        onSelect={onSelectCourier}
                        otherServices
                    />
                ))}
            </div>

            {isStedfastSelected && (
                <SteedfastSection
                    apiKey={apiKey}
                    setApiKey={setApiKey}
                    apiSecret={apiSecret}
                    setApiSecret={setApiSecret}
                    user={user}
                    fetchSettings={fetchSettings}
                />
            )}

            {isPathaoSelected && (
                <PathaoSection
                    pathaoBaseUrl={pathaoBaseUrl}
                    setPathaoBaseUrl={setPathaoBaseUrl}
                    pathaoClientId={pathaoClientId}
                    setPathaoClientId={setPathaoClientId}
                    pathaoClientSecret={pathaoClientSecret}
                    setPathaoClientSecret={setPathaoClientSecret}
                    user={user}
                    fetchSettings={fetchSettings}
                />
            )}

            {isRedxSelected && (
                <div className="mt-6 p-6 rounded-xl bg-gray-800 dark:bg-gray-900 text-gray-100 dark:text-gray-50 shadow-lg flex flex-col items-center justify-center text-center border border-gray-700">
                    <h2 className="text-2xl font-bold mb-2 text-blue-500">
                        Coming Soon!
                    </h2>
                    <p className="text-sm sm:text-base">
                        Integration with Redx courier service is on its way.
                        Stay tuned for updates!
                    </p>
                </div>
            )}

            {isPaperflySelected && (
                <div className="mt-6 p-6 rounded-xl bg-gray-800 dark:bg-gray-900 text-gray-100 dark:text-gray-50 shadow-lg flex flex-col items-center justify-center text-center border border-gray-700">
                    <h2 className="text-2xl font-bold mb-2 text-blue-500">
                        Coming Soon!
                    </h2>
                    <p className="text-sm sm:text-base">
                        Integration with Paperfly courier service is on its way.
                        Stay tuned for updates!
                    </p>
                </div>
            )}
        </CustomCollapse>
    );
};

import { IntegrateServicesProps } from '../Data_Type';
import { CustomCollapse } from './CustomCollapse';
import { CustomRadio } from './CustomRadio';
import { PaperflySection } from './PaperflySection';
import { PathaoSection } from './PathaoSection';
import { RedXSection } from './RedXSection';
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

    // RedX props
    redxBaseUrl,
    setRedxBaseUrl,
    redxApiKey,
    setRedxApiKey,
    redxApiSecret,
    setRedxApiSecret,

    // Paperfly props
    paperflyBaseUrl,
    setPaperflyBaseUrl,
    paperflyApiKey,
    setPaperflyApiKey,
    paperflyApiSecret,
    setPaperflyApiSecret,

    user,
    fetchSettings,
}) => {
    const isSteedfastSelected = selectedCourier === 'STEADFAST';
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
            {/* Recommended courier (Steedfast) */}
            {recommendedCourier && (
                <CustomRadio
                    courier={recommendedCourier}
                    isSelected={isSteedfastSelected}
                    onSelect={onSelectCourier}
                />
            )}

            {/* Other couriers */}
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

            {/* Steedfast Section */}
            {isSteedfastSelected && (
                <SteedfastSection
                    apiKey={apiKey}
                    setApiKey={setApiKey}
                    apiSecret={apiSecret}
                    setApiSecret={setApiSecret}
                    user={user}
                    fetchSettings={fetchSettings}
                />
            )}

            {/* Pathao Section */}
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

            {/* RedX Section */}
            {isRedxSelected && (
                <div className="mt-6">
                    <RedXSection
                        redxBaseUrl={redxBaseUrl}
                        setRedxBaseUrl={setRedxBaseUrl}
                        redxApiKey={redxApiKey}
                        setRedxApiKey={setRedxApiKey}
                        redxApiSecret={redxApiSecret}
                        setRedxApiSecret={setRedxApiSecret}
                        user={user}
                        fetchSettings={fetchSettings}
                    />
                </div>
            )}

            {/* Paperfly Section */}
            {isPaperflySelected && (
                <div className="mt-6">
                    <PaperflySection
                        paperflyBaseUrl={paperflyBaseUrl}
                        setPaperflyBaseUrl={setPaperflyBaseUrl}
                        paperflyApiKey={paperflyApiKey}
                        setPaperflyApiKey={setPaperflyApiKey}
                        paperflyApiSecret={paperflyApiSecret}
                        setPaperflyApiSecret={setPaperflyApiSecret}
                        user={user}
                        fetchSettings={fetchSettings}
                    />
                </div>
            )}
        </CustomCollapse>
    );
};

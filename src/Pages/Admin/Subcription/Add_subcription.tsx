import { Erp_context } from '@/provider/ErpContext';
import { message } from 'antd';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add_subscription = () => {
    const { user } = useContext(Erp_context);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('month');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState(['']);
    const [coreFeature, setCoreFeature] = useState('');

    const handleFeatureChange = (index, value) => {
        const updated = [...features];
        updated[index] = value;
        setFeatures(updated);
    };

    const addFeature = () => {
        setFeatures([...features, '']);
    };

    const removeFeature = index => {
        const updated = features.filter((_, i) => i !== index);
        setFeatures(updated);
    };

    const availableCoreFeatures = ['ERP', 'E-commerce', 'POS', 'HRM'];

    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [selectedCoreFeatures, setSelectedCoreFeatures] = useState<string[]>(
        []
    );

    const handleFeatureToggle = (feature: string) => {
        setSelectedFeatures(prev =>
            prev.includes(feature)
                ? prev.filter(f => f !== feature)
                : [...prev, feature]
        );
    };

    const handleCoreFeatureToggle = (feature: string) => {
        setSelectedCoreFeatures(prev =>
            prev.includes(feature)
                ? prev.filter(f => f !== feature)
                : [...prev, feature]
        );
    };

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            type: title,
            price,
            subscription: duration,
            description,
            buttonText: `Choose ${title}`,
            features: features,
            coreFeatures: selectedCoreFeatures,
        };
        fetch(
            `${import.meta.env.VITE_BASE_URL}/admin/subscription/create-subscription`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?._id}`,
                },
                body: JSON.stringify(data),
            }
        )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                message.success(data.message);
                // setTitle("");
                // setPrice("");
                // setDuration("month");
                // setDescription("");
                // setFeatures([""]);
                // setSelectedFeatures([]);
                // setSelectedCoreFeatures([]);
                // navigate("/admin/manage-subscription")
            });
    };

    return (
        <div className="max-w-4xl  bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Add Subscription
            </h2>
            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Professional"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Price
                    </label>
                    <input
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="5000"
                    />
                </div>

                {/* Duration */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Duration
                    </label>
                    <select
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                        className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                        <option value="lifetime">Lifetime</option>
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows={3}
                        className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Perfect for using in a personal website or a client project."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Features
                    </label>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 mt-2"
                        >
                            <input
                                type="text"
                                value={feature}
                                onChange={e =>
                                    handleFeatureChange(index, e.target.value)
                                }
                                className="flex-1 border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                                placeholder="Enter feature"
                            />
                            <button
                                type="button"
                                onClick={() => removeFeature(index)}
                                className="px-2 py-1 bg-red-500 text-white rounded-md"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addFeature}
                        className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md"
                    >
                        + Add Feature
                    </button>
                </div>
                {/* Core Features checklist */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Core Features
                    </label>
                    <div className="mt-2 space-y-2">
                        {availableCoreFeatures.map((feature, idx) => (
                            <label
                                key={idx}
                                className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedCoreFeatures.includes(
                                        feature
                                    )}
                                    onChange={() =>
                                        handleCoreFeatureToggle(feature)
                                    }
                                    className="h-4 w-4 text-green-600 border-gray-300 rounded"
                                />
                                {feature}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
                >
                    Save Subscription
                </button>
            </form>
        </div>
    );
};

export default Add_subscription;

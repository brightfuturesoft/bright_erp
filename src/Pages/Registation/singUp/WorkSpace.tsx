import { Building2, ImageUp } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setToLocalStorage } from '@/helpers/local-storage';
import uploadImage from '@/helpers/hooks/uploadImage';
import { getBaseUrl } from '@/helpers/config/envConfig';

export default function WorkSpace() {
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [uniqueName, setUniqueName] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
    const [warningMessage, setWarningMessage] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmitHandler = async (
        e: React.BaseSyntheticEvent<Event, EventTarget & HTMLFormElement>
    ) => {
        // e.preventDefault();
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name') as string;
        const image = formData.get('image') as File;
        const terms = formData.get('terms') === 'on';

        if (!name.trim()) {
            setWarningMessage('Workspace name is required');
            return;
        }

        if (!image) {
            setWarningMessage('Workspace logo is required');
            return;
        }

        if (!terms) {
            setWarningMessage('Terms must be accepted');
            return;
        }

        // Proceed with form submission
        const imageURL = await uploadImage(image);
        // console.log(imageURL);

        const bodyData = {
            name,
            image: imageURL,
            terms: '',
            description: '',
            unique_id: uniqueName,
        };

        // return;
        // const storeInCache = await storeCacheData("workspaceData", bodyData);

        // // console.log(storeInCache)
        // if (storeInCache) {
        //     // alert('Data stored successfully in cache.');
        // }

        setToLocalStorage('worspaceData', JSON.stringify(bodyData));
        navigate('/workspace/sign-up');
        //   add the data in catch storage
        // localStorage.setItem('worspaceData', JSON.stringify(bodyData));

        // Example: Submitting form data using fetch
        // try {
        //     const response = await fetch('your-submit-url', {
        //         method: 'POST',
        //         body: formData,
        //         // Add headers if needed, e.g., for authorization or content-type
        //     });
        //     // Handle response as needed
        // } catch (error) {
        //     console.error('Error submitting form:', error);
        // }
    };

    useEffect(() => {
        if (uniqueName.length > 3)
            fetch(`${getBaseUrl}/auth/check-workspace?unique_id=${uniqueName}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.error) {
                        setWarningMessage(data.message);
                    } else {
                        setWarningMessage(null);
                    }
                });
    }, [uniqueName]);

    return (
        <div className="container-home">
            <section>
                <div className="min-h-full lg:flex lg:justify-between">
                    <div className="flex flex-col justify-center flex-1 px-4 py-12 bg-white dark:bg-gray-900  sm:px-6 lg:px-20 xl:px-24">
                        <div className="flex-1 max-w-sm mx-auto lg:max-w-md">
                            {/* <img
                                className="w-auto h-8 mx-auto lg:mx-0"
                                src="https://cdn.rareblocks.xyz/collection/clarity/images/logo.svg"
                                alt=""
                            /> */}

                            <h1 className="mt-10 text-3xl font-bold text-center text-gray-900 dark:text-white lg:mt-20 xl:mt-32 sm:text-4xl xl:text-5xl font-pj lg:text-left">
                                Create Your Work Space Now
                            </h1>

                            <form
                                // action="#"
                                // method="POST"
                                onSubmit={onSubmitHandler}
                                onChange={() => setWarningMessage('')}
                                className="mt-10"
                            >
                                <div className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor=""
                                            className="text-base font-medium text-gray-900 dark:text-white"
                                        >
                                            Workspace Name
                                        </label>

                                        <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <Building2
                                                    strokeWidth={1}
                                                    className="w-5 h-5 "
                                                />
                                            </div>
                                            <input
                                                type="name"
                                                name="name"
                                                id="name"
                                                onChange={e => {
                                                    const value =
                                                        e.target.value;
                                                    const uniqueValue = value
                                                        .toLowerCase()
                                                        .replace(/\s/g, '-');
                                                    setUniqueName(uniqueValue);
                                                }}
                                                placeholder="Workspace Name"
                                                className="block w-full py-4 pl-10 pr-4 text-black dark:text-white placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg
                                                    className="w-5 h-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                value={uniqueName}
                                                // here always type lowercase and here do not use space space is replace with "-" also when change the name than auto input
                                                onChange={e => {
                                                    const value =
                                                        e.target.value;
                                                    const formattedValue = value
                                                        .toLowerCase()
                                                        .replace(/\s/g, '-');
                                                    e.target.value =
                                                        formattedValue;
                                                    setUniqueName(
                                                        formattedValue
                                                    );
                                                }}
                                                name="unique_id"
                                                id="unique_id"
                                                placeholder="Enter Business Unique Name"
                                                className="block w-full py-4 pl-10 pr-4 text-black dark:text-white placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                                <button
                                                    type="button"
                                                    className="focus:outline-none"
                                                ></button>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                            <input
                                                type="file"
                                                name="image"
                                                id="image"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                                {imagePreviewUrl ? (
                                                    <img
                                                        src={imagePreviewUrl}
                                                        alt="Uploaded preview"
                                                        className="w-5 h-5 object-cover"
                                                    />
                                                ) : (
                                                    <ImageUp className="w-5 h-5 text-gray-400" />
                                                )}
                                            </div>
                                            <label
                                                htmlFor="image"
                                                className="block w-full py-4 pl-10 pr-4 bg-gray text-black dark:text-white placeholder-gray-500 transition-all duration-200 border border-opacity-100 dark:border-opacity-30 border-gray-200 rounded-md  focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                            >
                                                {fileName ||
                                                    'Upload Your Brand Logo'}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative flex items-center mt-5">
                                    <div className="flex items-center h-5">
                                        <input
                                            type="checkbox"
                                            name="terms"
                                            id="terms"
                                            className="w-5 h-5 text-gray-900 dark:text-white border-gray-300 rounded focus:ring-gray-900"
                                        />
                                    </div>

                                    <div className="ml-3 text-base">
                                        <label className="font-normal text-gray-900 dark:text-white font-pj">
                                            {' '}
                                            I agree with{' '}
                                            <a
                                                href="#"
                                                title=""
                                                className="font-bold rounded focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:underline"
                                            >
                                                Terms & Conditions
                                            </a>{' '}
                                        </label>
                                    </div>
                                </div>

                                {warningMessage && (
                                    <div className="text-red-600 mt-8 dark:text-red-400">
                                        {warningMessage}
                                    </div>
                                )}

                                <div className="relative mt-8">
                                    <div className="absolute -inset-2">
                                        <div
                                            className="w-full h-full mx-auto opacity-30 blur-lg filter"
                                            style={{
                                                background:
                                                    'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
                                            }}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="relative flex items-center justify-center w-full px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-600"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>

                            <p className="mt-10 text-base font-normal text-center text-gray-900 dark:text-white lg:mt-8 xl:mt-12 font-pj lg:text-left">
                                Already have a workspace?
                                <Link
                                    to="/sign-in"
                                    title=""
                                    className="font-bold ml-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:underline"
                                >
                                    Login now
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* right section */}
                    <div className="relative grid flex-1 w-full px-4 py-12 overflow-hidden bg-gray-900 lg:max-w-2xl lg:px-20 xl:px-24 sm:px-6 place-items-center">
                        <div className="absolute inset-0">
                            <img
                                className="object-cover object-top w-full h-full scale-150 -rotate-90 opacity-10"
                                src="https://cdn.rareblocks.xyz/collection/clarity/images/sign-up/4/background-pattern.png"
                                alt=""
                            />
                        </div>

                        <div className="relative max-w-sm mx-auto">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 dark:bg-white rounded-xl">
                                <svg
                                    className="w-auto h-5 dark:text-dark text-light"
                                    viewBox="0 0 33 23"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M32.0011 4.7203L30.9745 0C23.5828 0.33861 18.459 3.41404 18.459 12.4583V22.8687H31.3725V9.78438H26.4818C26.4819 6.88236 28.3027 5.17551 32.0011 4.7203Z" />
                                    <path d="M13.5421 4.7203L12.5155 0C5.12386 0.33861 0 3.41413 0 12.4584V22.8687H12.914V9.78438H8.02029C8.02029 6.88236 9.84111 5.17551 13.5421 4.7203Z" />
                                </svg>
                            </div>

                            <blockquote className="mt-14">
                                <p className="text-2xl font-medium leading-relaxed text-white dark:text-light lg:text-3xl font-pj">
                                    “Enjoy simplicity and speed with our ERP
                                    system! Make changes seamlessly.”
                                </p>
                            </blockquote>

                            <div className="flex items-center mt-12">
                                <img
                                    className="flex-shrink-0 object-cover rounded-full border border-gray-400 w-14 h-14"
                                    src="https://codewithmahadihasan.tech/assets/Hero_Image-CacPG5RX.png"
                                    alt=""
                                />
                                <div className="ml-4">
                                    <p className="text-xl font-bold  text-light font-pj">
                                        Md. Mahadi Hasan
                                    </p>
                                    <p className="mt-px text-lg font-normal text-gray-400 font-pj">
                                        Chef Executive Officer
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

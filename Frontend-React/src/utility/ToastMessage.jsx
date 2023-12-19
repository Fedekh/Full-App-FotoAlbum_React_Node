
export default function ToastMessage({ crud, resourceName, color }) {
    let iconColor, bgColor, textColor, message;

    switch (crud) {
        case 'create':
            iconColor = 'text-green-500';
            bgColor = 'bg-green-500';
            textColor = 'text-white';
            message = `${resourceName.toUpperCase()} aggiunto correttamente.`
            break;
        case 'delete':
            iconColor = 'text-red-500';
            bgColor = 'bg-red-500';
            textColor = 'text-white';
            message = `${resourceName.toUpperCase()} cancellato correttamente.`;
            break;
        case 'edit':
            iconColor = 'text-orange-500';
            bgColor = 'bg-orange-500';
            textColor = 'text-white';
            message = `${resourceName.toUpperCase()} modificato correttamente. `;
            break;
    }
    const dynamicColor = color ? color : 'green';

    return (
        <div
            className={`flex items-center w-full max-w-xs p-4 mb-4 ${textColor} ${bgColor} rounded-lg shadow`}
            role="alert"
        >
            <div
                className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${iconColor} rounded-lg `}
            >
            </div>
            <div className={`ms-3 text-sm font-normal`}>{message}</div>
            <span className="sr-only">Close</span>
            <svg
                className={`w-3 h-3 text-${dynamicColor}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
            >
                {/* Close icon SVG code here */}
            </svg>
        </div>
    );
}
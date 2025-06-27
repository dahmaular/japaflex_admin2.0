import './loader.css';

const Loader = ({ color }: { color?: string }) => {
    return (
        <div className="loader">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    display: 'block',
                    shapeRendering: 'auto',
                }}
                width={'25px'}
                height={'25px'}
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
            >
                <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    stroke={color ?? '#346AFF'}
                    strokeWidth="12.5"
                    r="35"
                    strokeDasharray="164.93361431346415 56.97787143782138"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        repeatCount="indefinite"
                        dur="1s"
                        values="0 50 50;360 50 50"
                        keyTimes="0;1"
                    ></animateTransform>
                </circle>
            </svg>
        </div>
    );
};

export default Loader;

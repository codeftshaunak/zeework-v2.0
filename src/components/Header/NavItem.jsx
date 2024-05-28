import Link from "next/link";
import { useRouter } from "next/router";

const NavItem = ({ title, noIcon, url, onClick, isNotification }) => {
    const router = useRouter();
    const isActive = router.pathname === url;

    const handleClick = (e) => {
        e.preventDefault();
        if (onClick) {
            onClick();
        }
        router.push(url);
    };

    return (
        <a href={url} onClick={handleClick} className={`cursor-pointer flex items-center gap-1 ${isActive ? "text-[var(--primarycolor)]" : "text-[#374151]"}`}>
            <p className={`sm:text-xs md:text-[16px] font-[500] ${isNotification && "text-red-500"}`}>
                {title}
            </p>
            {isNotification > 0 && (
                <p className="bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center font-medium text-sm">
                    {isNotification > 9 ? "9+" : isNotification}
                </p>
            )}
        </a>
    );
};

export default NavItem;

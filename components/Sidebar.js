import Link from "next/link";

const Sidebar = () => {
    return (
        <div className="bg-secondary text-white full-screen sticky-top">
            <div className="py-2">
                <h4 className="text-center">Cheeky Ginger Studio</h4>
                <ul className="nav flex-column ps-2">
                    <li className="nav-item py-2 border-bottom border-white">
                        <Link href="/"><a className="text-white sidenav-link"><h5>Home</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 border-bottom border-white">
                        <Link href="/home-sections"><a className="text-white sidenav-link"><h5>Edit Home Sections</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 border-bottom border-white">
                        <Link href="/home-sliders"><a className="text-white sidenav-link"><h5>Edit Home Sliders</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 border-bottom border-white">
                        <Link href="/home-fields"><a className="text-white sidenav-link"><h5>Edit Home Fields</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 border-bottom border-white">
                        <Link href="/privacy"><a className="text-white sidenav-link"><h5>Edit Privacy Page</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 border-bottom border-white">
                        <Link href="/terms"><a className="text-white sidenav-link"><h5>Edit Terms Page</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 border-bottom border-white">
                        <Link href="/socials"><a className="text-white sidenav-link"><h5>Edit Social Media Links</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 border-bottom border-white">
                        <Link href="/products"><a className="text-white sidenav-link"><h5>Edit/Remove Products</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 border-bottom border-white">
                        <Link href="/products/add"><a className="text-white sidenav-link"><h5>Add Products</h5></a></Link>
                    </li>
                </ul>
            </div>
            <div className="position-absolute bottom-0 start-0 ps-2">
                <h6 className="text-white text-center">
                    &copy; {(new Date().getFullYear())} Cheeky Ginger Studio. All Rights Reserved.<br />
                    Powered by GALACTIC|blue
                </h6>
            </div>
        </div>
    )
}

export default Sidebar;
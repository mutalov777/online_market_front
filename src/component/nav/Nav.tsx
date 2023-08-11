import React, {useState} from "react";
import {AiOutlineUser} from "react-icons/ai";
import {TiShoppingCart} from "react-icons/ti";
import {HiOutlineMenu} from "react-icons/hi";
import {BiCommentError} from "react-icons/bi";
import {Tooltip} from "reactstrap";
import {Link, Outlet} from "react-router-dom";
import Menu from "../navbar/Menu";
import Chat from "../chat/Chat";

function Nav() {
    const [activeNav, setActiveNav] = useState('#')

    const [tools] = useState([
        {id: 'tooltipMenu', text: 'Menu'},
        {id: 'tooltipCart', text: 'Cart'},
        {id: 'tooltipAccount', text: 'Account'},
        {id: 'tooltipFeedback', text: 'Feedback'}
    ]);

    return (
        <div>
            <div className={'MiniNav'}>
                <nav>
                    <Link to={"/"} id={'tooltipMenu'} className={activeNav === '#' ? 'active' : ''}
                          onClick={() => setActiveNav('#')}><HiOutlineMenu/></Link>

                    <Link to={"/cart"} id={'tooltipCart'} className={activeNav === '#cart' ? 'active' : ''}
                          onClick={() => setActiveNav('#cart')}><TiShoppingCart/></Link>

                    <Link to={"/profile"} id={'tooltipAccount'} className={activeNav === '#account' ? 'active' : ''}
                          onClick={() => setActiveNav('#account')}><AiOutlineUser/></Link>

                    <Link to={"/feedback"} id={'tooltipFeedback'} className={activeNav === '#feedback' ? 'active' : ''}
                          onClick={() => setActiveNav('#feedback')}><BiCommentError/></Link>

                    {
                        tools.map((tooltip, i) => {
                            return <TooltipItem key={i} id={tooltip.id} text={tooltip.text}/>;
                        })
                    }
                </nav>
            </div>
            <Menu/>
            <Chat/>
            <Outlet/>
        </div>
    );
}

export function TooltipItem({id, text}: { id: string, text: string }) {

    const [tool, setTooltipOpen] = useState(false);

    function toggle() {
        setTooltipOpen(!tool);
    }

    return (
        <Tooltip className={'tooltip'} placement={'left'} isOpen={tool} target={id} toggle={toggle}>
            {text}
        </Tooltip>
    );

}

export default Nav;
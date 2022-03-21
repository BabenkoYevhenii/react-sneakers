import{Link } from 'react-router-dom'

function Header(props){
    return(<header className="d-flex justify-between align-center">
        <Link to="/">
        <div className="d-flex align-center ">

            <img width={40} height={40} src="/img/logo.png " alt="Logo" />

            <div className="headerInfo">
                <h3 className="text-uppercase">React Sneakers</h3>
                <p> Магазин лучших кросовок</p>
            </div>
        </div>  </Link>
        <ul className="d-flex">
            <li onClick={props.onClickCart} className="mr-30">
                <img  width={18} height={18} src="/img/cart.png " alt="Cart" />
                <span> 120 usd</span>
            </li>
            <li>
          <Link to="/favorites">  <img className="mr-30" width={18} height={18} src="/img/heart.svg" alt="Закладки" />
          </Link> </li>
            <li>
                <img width={18} height={18} src="/img/user.svg " alt="User"/>
            </li>
        </ul>
    </header>)




}
export default Header;
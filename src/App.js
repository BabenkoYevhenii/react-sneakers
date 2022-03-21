import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'
import React from "react";
import axios from "axios";
import {Route} from 'react-router-dom'
import Home from './pages/Home'
import Favorites from "./pages/Favorites";

import AppContext from './context';


function App() {

    const [items, setItems] = React.useState([])
    const [cartItems, setCartItems] = React.useState([])
    const [favorites, setFavorites] = React.useState([])
    const [searchValue, setSearchValue] = React.useState('')
    const [cartOpened, setCartOpened] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        async function fetchData() {
            // TODO: Сделать try catch + Promise.all
            const cartResponse = await axios.get('https://60e8b07e673e350017c21933.mockapi.io/cart');
            const favoritesResponse = await axios.get('https://60e8b07e673e350017c21933.mockapi.io/favorites');
            const itemsResponse = await axios.get('https://60e8b07e673e350017c21933.mockapi.io/items');

            setIsLoading(false);
            setCartItems(cartResponse.data);
            setFavorites(favoritesResponse.data);
            setItems(itemsResponse.data);
        }

        fetchData();
    }, [])

    const onAddToCart = (obj) => {
        console.log(obj);

        if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
            axios.delete(`https://60e8b07e673e350017c21933.mockapi.io/cart/${obj.id}`);
            setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
        } else {
            axios.post('https://60e8b07e673e350017c21933.mockapi.io/cart', obj);
            setCartItems((prev) => [...prev, obj]);
        }

    }

    const onRemoveItem = (id) => {
        axios.delete(`https://60e8b07e673e350017c21933.mockapi.io/cart/${id}`)
        setCartItems((prev) => prev.filter(item => item.id !== id))


    }
    const onChangeSearchInput = (event) => {
        console.log(event.target.value)
        setSearchValue(event.target.value)

    }
    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {

                axios.delete(`https://60e8b07e673e350017c21933.mockapi.io/favorites/${obj.id}`);
                setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
            } else {
                const { data } = await axios.post('https://60e8b07e673e350017c21933.mockapi.io/favorites', obj);
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            alert('Не удалось добавить в фавориты');
        }
    };

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.id) === Number(id));
    };

    return (

        <AppContext.Provider
            value={{
                items,
                cartItems,
                favorites,
                isItemAdded,
                onAddToFavorite,
                setCartOpened,
                setCartItems,
            }}>
            <div className="wrapper clear">
                {cartOpened && (
                    <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />
                )}

                <Header onClickCart={() => setCartOpened(true)} />

                <Route path="/" exact>
                    <Home
                        items={items}
                        cartItems={cartItems}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToFavorite={onAddToFavorite}
                        onAddToCart={onAddToCart}
                        isLoading={isLoading}
                    />
                </Route>

                <Route path="/favorites" exact>
                    <Favorites />
                </Route>
            </div>
        </AppContext.Provider>
    );
}

export default App;

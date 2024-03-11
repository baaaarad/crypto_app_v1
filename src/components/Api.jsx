import React, { useRef } from "react";
import { coinData } from "./coin-data"
import { DataGrid} from '@mui/x-data-grid';


const CoinList = () => {
    const defaultCoins = useRef([])
    const [coins, setCoins] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
                );
                const data = await response.json();
                setCoins(data);
                defaultCoins.current = data;
            } catch (error) {
                console.error("Error while fetching data", error);
            }
        };
    
        fetchData(); 
    
        const interval0 = setInterval(fetchData, 6000);
    
        return () => clearInterval(interval0);
    }, []);
    

    const formattedCoins = coins.map((coin) => ({
        name: coin.name,
        symbol: coin.symbol,
        price: coin.current_price,

    }));
    const handleChange = (event) => {
        const newCoins = coins.filter(coin => coin.id.includes(event.target.value)) || coins.filter(coin => coin.symbol.includes(event.target.value)) || coins.filter(coin => coin.image.includes(event.target.value))
        setCoins(newCoins)
    }

    const columns = [
        { field: 'market_cap_rank', headerName: '#', width: 50 },
        { 
            field: 'image', 
            headerName: 'img', 
            width: 50,
            renderCell: (params) => (
                <img src={params.value} alt="coin" style={{width: '30px', height: '30px'}}/>
            ),
        },
        { field: 'id', headerName: 'Name', width: 350 },
        { field: 'current_price', headerName: 'Price $', width: 100 },
        { field: 'high_24h', headerName: '24H_high_Rank', width: 130 },
        { field: 'low_24h', headerName: '24H_low_Rank', width: 130 },
        { field: 'price_change_24h', headerName: '24H_price_change', width: 130 },
        { field: 'market_cap_change_24h', headerName: '24H_market_gap', width: 130 },
    ]
    

    return (
        <div style={{ width:"80vw"}}>
            <h2 style={{ borderBottom: "2px solid #000", display: "inline-block", marginLeft: "5px",color:"black" }}>Cryptocurrency</h2>
            <input type="text" onChange={handleChange} style={{display: "block"}} placeholder="search..." />

            <div style={{ height: 400, width: '100%', color:" #fff" }}>
                <DataGrid
                    rows={coins}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>
        </div>
    );
};

export default CoinList;
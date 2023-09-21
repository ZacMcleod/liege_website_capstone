import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

const AdminPage = () => {
    const [sales, setSales] = useState(0);
    const [salesRevenue, setSalesRevenue] = useState(0);

    useEffect(() => {
        const storedSales = JSON.parse(localStorage.getItem('sales')) || 0;
        const storedSalesRevenue = JSON.parse(localStorage.getItem('salesRevenue')) || 0;

        setSales(storedSales);
        setSalesRevenue(storedSalesRevenue);
    }, []);
    return(
        <div>
            <h1>Hello</h1>
            <h1>Admin Page</h1>
            <div>
                All Sales: {sales} All Sales Revenue: {salesRevenue}
            </div>
        </div>
    )
}
export default AdminPage;
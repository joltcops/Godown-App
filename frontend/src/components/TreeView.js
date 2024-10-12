import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles.css'; 
//const apiUrl = "https://obscure-badlands-67498-8ccc889a168e.herokuapp.com/api/";


const TreeView = () => {
    const [godowns, setGodowns] = useState([]);
    const [items, setItems] = useState([]);
    const [expandedGodowns, setExpandedGodowns] = useState(new Set());
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/godowns/')
            .then(response => setGodowns(response.data))
            .catch(error => console.error("Error fetching godowns:", error));

        axios.get('http://127.0.0.1:8000/api/items/')
            .then(response => setItems(response.data))
            .catch(error => console.error("Error fetching items:", error));
    }, []);

    const handleExpandClick = (godownId) => {
        const newExpandedGodowns = new Set(expandedGodowns);
        if (newExpandedGodowns.has(godownId)) {
            newExpandedGodowns.delete(godownId);
        } else {
            newExpandedGodowns.add(godownId);
        }
        setExpandedGodowns(newExpandedGodowns);
    };

    const renderSubGodowns = (parentId) => {
        return godowns
            .filter(godown => godown.parent_godown === parentId)
            .map(godown => (
                <div key={godown.id} style={{ marginLeft: '20px' }}>
                    <button className="godown-button" onClick={() => handleExpandClick(godown.id)}>
                        {expandedGodowns.has(godown.id) ? '−' : '+'} {godown.name}
                    </button>
                    {expandedGodowns.has(godown.id) && (
                        <div>
                            {renderSubGodowns(godown.id)}
                            {renderItems(godown.id)}
                        </div>
                    )}
                </div>
            ));
    };

    const renderItems = (godownId) => {
        return items
            .filter(item => item.godown === godownId)
            .map(item => (
                <div key={item.item_id} className="item">
                    <button className="item-button" onClick={() => setSelectedItem(item)}>
                        {item.name}
                    </button>
                </div>
            ));
    };

    return (
        <div className="tree-view-container">
            <div className="sidebar">
                <h2>Godowns</h2>
                {godowns.filter(godown => godown.parent_godown === null).map(godown => (
                    <div key={godown.id}>
                        <button className="godown-button" onClick={() => handleExpandClick(godown.id)}>
                            {expandedGodowns.has(godown.id) ? '−' : '+'} {godown.name}
                        </button>
                        {expandedGodowns.has(godown.id) && (
                            <div>
                                {renderSubGodowns(godown.id)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="main-content">
                {selectedItem ? (
                    <div>
                        <h3>{selectedItem.name}</h3>
                        <p>Quantity: {selectedItem.quantity}</p>
                        <p>Category: {selectedItem.category}</p>
                        <p>Price: ${selectedItem.price}</p>
                        <p>Status: {selectedItem.status}</p>
                        <p>Brand: {selectedItem.brand}</p>
                        <p>Type: {selectedItem.attributes?.type}</p>
                        <p>Material: {selectedItem.attributes?.material}</p>
                        <p>Warranty Years: {selectedItem.attributes?.warranty_years}</p>
                        <img src={selectedItem.image_url} alt={selectedItem.name} />
                    </div>
                ) : (
                    <p>Select a godown to see the items.</p>
                )}
            </div>
        </div>
    );
};

export default TreeView;

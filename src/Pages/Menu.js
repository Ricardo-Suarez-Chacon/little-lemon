import React, { useEffect, useState } from 'react';
import HlCard from '../Components/HlCard';
import MenuData from '../Api_response/Menu.json';

import '../Css/Menu.css';


const Menu = () => {
    const [deviceType, setDeviceType] = useState('desktop');
    const [menuItems, setMenuItems] = useState({});

    useEffect(() => {
        const handleResize = () => {
          const width = window.innerWidth;
          if (width < 464) {
            setDeviceType('mobile');
          } else if (width >= 464 && width < 1024) {
            setDeviceType('tablet');
          } else {
            setDeviceType('desktop');
          }
        };
        const groupedItems = MenuData.reduce((acc, item) => {
            const group = item.group || 'Other';
            if (!acc[group]) {
                acc[group] = [];
            }
            acc[group].push(item);
            return acc;
        }, {});
        //console.log("groupedItems", groupedItems)
        setMenuItems(groupedItems);

        window.addEventListener('resize', handleResize);
        handleResize(); // Llamar al inicio para establecer el tipo de dispositivo inicial

        return () => window.removeEventListener('resize', handleResize);
      }, []);
      const responsive = {
        desktop: {
          items: 3,
        },
        tablet: {
          items: 2,
        },
        mobile: {
          items: 1,
        }
      };

      const renderMenuItems = () => {
        return Object.keys(menuItems).map(group => (
          <section key={group} className='menu-container'>
            <h2 className='text-group'>{group}</h2>
            <div className="group-container">
              {menuItems[group].reduce((acc, item, index) => {
                const itemsPerRow = responsive[deviceType].items;
                const rowIndex = Math.floor(index / itemsPerRow);
                if (!acc[rowIndex]) {
                  acc[rowIndex] = [];
                }
                acc[rowIndex].push(
                  <div className='card-container'>
                    <HlCard
                      key={item.title}
                      photo={item.photo}
                      title={item.title}
                      price={item.price}
                      description={item.description}
                    />
                  </div>
                );
                return acc;
              }, []).map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                  {row}
                </div>
              ))}
            </div>
          </section>
        ));
      };
      return <div className='all-background'>{renderMenuItems()}</div>;
};

export default Menu;
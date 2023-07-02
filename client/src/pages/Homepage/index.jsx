// import React from 'react';
import { useEffect } from 'react';
import Body from '../../components/Body';

const Homepage = ({ socket }) => {

    return (
        <>
            <Body socket={socket} />
        </>
    );
};



export default Homepage
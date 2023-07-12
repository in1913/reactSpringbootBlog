import React, {useState} from 'react';
import styled from 'styled-components';

const TagBox = styled.div`
    font-size: 20px;
    transition: all 0.3s;
    display: flex;
    justify-content: space-between;
    &:first-letter{
        text-transform: uppercase;
    }
`
const Button = styled.button`
    color: #fff;
    background: transparent;
    border: 2px solid;
    border-radius : 10000px;
    margin-left: 5px;
    font-size: 5px;
    padding: 0px 10px;
    transition: all 0.3s;
    vertical-align: middle;
`
const Tag = ({tags, onRemove}) => {
    const [isHover, setIsHover] = useState(false);
    const handleHoverOver = () => {
        setIsHover(true);
    }
    const handleHoverOut = () => {
        setIsHover(false);
    }
    const handleRemoveTag = (e) => {
        onRemove(tags);
        
    }
    return (
        <TagBox className={isHover ? 'rounded m-1 py-1 px-2 bg-secondary text-black bg-warning': 'rounded m-1 py-1 px-2 bg-secondary text-white'}
            onMouseOut={handleHoverOut}
            onMouseOver={handleHoverOver}
        >
            {tags}
            <Button onClick={handleRemoveTag} className={isHover ? 'close-btn text-danger bg-white' : 'close-btn'}>X</Button>
        </TagBox>
    );
};

export default Tag;
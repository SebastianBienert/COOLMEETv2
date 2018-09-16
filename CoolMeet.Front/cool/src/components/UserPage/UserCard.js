import React from 'react';
import {Card, Avatar} from 'antd';
import AvatarPlaceholder from '../../assets/avatar.png';
const { Meta } = Card;

const UserCard = ({ allowShowingProfile, photoUrl, firstName, lastName, email}) => {
    const image = (allowShowingProfile == true && photoUrl != null) ? photoUrl : AvatarPlaceholder;
    return (
        <div>
            <Card
                loading = {!allowShowingProfile}
                hoverable
                style={{ width: 240 }}
                cover={<img alt="userPhoto" src={image} />}>             

            <p><b>Imie: </b>{firstName}</p>
            <p><b>Nazwisko: </b>{lastName}</p>
            <p><b>Email: </b>{email}</p>
            </Card>
        </div>
    );
};

export default UserCard;
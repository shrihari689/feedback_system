import React, { useEffect, useState } from 'react';
import '../../adminManageUsers.css';
import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import AdminManageUsersItem from './adminManageUsersItem';
import Loader from '../general/loadingPage';


const AdminManageUsersContainer = (props) => {
  
    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState([-1]);
    

    useEffect(() => {
        const dbRef = firebase.firestore().collection('Settings');
        dbRef.get().then(({docs}) => {
            setIsLoading((prev) => prev.filter((i) => i !== -1));
            const newRoles = docs.map((e) => e.data());
            setRoles(newRoles);
        }).catch((err) => {
            setIsLoading((prev) => prev.filter((i) => i !== -1));
        });
    },[]);

    const handleSaveRole = (roleId, newData, index) => {
        setIsLoading((prev) => [index, ...prev]);
        if(roleId === -1){
            const dbRef = firebase.firestore().collection('Settings').doc();
            const newRoleId = dbRef.id;
            dbRef.set({
                roleId: newRoleId,
                ...newData
            }).then((result) => {
                const oldRoles = [...roles];
                oldRoles.pop();
                oldRoles.push({
                    roleId: newRoleId,
                    ...newData  
                });
                setRoles(oldRoles);
                setIsLoading((prev) => prev.filter((i) => i !== index));
            }).catch((err) => {
                alert('Error in Saving Role!');
                setIsLoading((prev) => prev.filter((i) => i !== index));
            });
        }else{
            const dbRef = firebase.firestore().collection('Settings').doc(roleId);
            dbRef.update({
                roleId: roleId,
                ...newData
            }).then((result) => {
                const newRoles = [...roles];
                const newIndex = newRoles.findIndex((e) => e.roleId === roleId);
                newRoles[newIndex] = {
                    roleId: roleId,
                    ...newData
                };
                setRoles(newRoles);
                alert('Updated Successfully!');
                setIsLoading((prev) => prev.filter((i) => i !== index));
            }).catch((err) => {
                alert('Error in Saving Role!');
                setIsLoading((prev) => prev.filter((i) => i !== index));
            });
        }
        
    };

    const handleDeleteRole = (roleId, index) => {
        setIsLoading((prev) => [index, ...prev]);        
        const confirm = window.confirm("Are you sure want to delete this role?");        
        if(roleId === -1 && confirm){
            setIsLoading((prev) => prev.filter((i) => i !== index));
            setRoles((prev) => prev.filter((e, i) => i !== index));
        }else if(confirm){
            const dbRef = firebase.firestore().collection('Settings').doc(roleId);
            dbRef.delete().then((result) => {
                const newRoles = roles.filter((e) => e.roleId !== roleId);
                setIsLoading((prev) => prev.filter((i) => i !== index));
                setRoles(newRoles);
            }).catch((err) => {
                alert("Error in Deleting Role!");
                setIsLoading((prev) => prev.filter((i) => i !== index));
            });
        }else{
            setIsLoading((prev) => prev.filter((i) => i !== index));
        }
    };

    if(isLoading.includes(-1)) {
        return <Loader />;
    }

    return ( 
        <div className="adminManageUsers__container">
            <h3>Manage Users</h3>
            <div className="adminManageUsers__usersList">
                {
                    roles.map((role, i) => {
                        return (
                            <AdminManageUsersItem
                                key={role.roleId}
                                index={i}
                                role={role}
                                isLoading={isLoading}
                                onRoleSave={handleSaveRole}
                                onRoleDelete={handleDeleteRole}
                            />
                        );
                    })
                }
                {
                    roles.some((e) => e.roleId === -1) ? null : (
                        <div
                            className="button"
                            onClick={() => {
                                const oldRoles = [...roles];
                                oldRoles.push({roleId: -1, name: '', users: []});
                                setRoles(oldRoles);  
                            }}
                        >Add New Role</div>
                    )
                }
            </div>
        </div>
    );
}
 
export default AdminManageUsersContainer;
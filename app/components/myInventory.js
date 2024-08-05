// src/app/components/MyInventory.js

import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore, auth } from '../firebase';

const MyInventory = () => {
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error('User not authenticated');
        }

        const q = query(collection(firestore, 'users', user.uid, 'items'));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setUserItems(items);
      } catch (error) {
        console.error('Error fetching user items:', error);
      }
    };

    fetchUserItems();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      const itemRef = doc(collection(firestore, 'users', user.uid, 'items'), itemId);
      await deleteDoc(itemRef);

      setUserItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h6">My Inventory</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userItems.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MyInventory;

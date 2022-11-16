import React from 'react';
import Table from 'react-bootstrap/Table';
import { Container } from 'react-bootstrap';


const Users = ({users}) => {
  return (
    <Container>
          <Table striped bordered hover variant='dark'>
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Prénom et Nom</th>
                      <th>Email</th>
                  </tr>
              </thead>

              <tbody>
                  {users.map((user, i) => (
                      <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                      </tr>
                  ))}
              </tbody>
          </Table>
    </Container>
  )
}

export default Users;
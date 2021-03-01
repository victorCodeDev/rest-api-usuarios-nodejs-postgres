import { Request, Response } from 'express'
import { QueryResult, Query } from 'pg'


import { pool } from '../database'

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('select * from users');
        return res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server error');
    }
}

export const getUsersById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query('select * from users where id = $1', [id]);
    return res.status(200).json(response.rows);
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const { name, email } = req.body;
    await pool.query('insert into users (name, email) values ($1, $2)', [name, email]);
    return res.status(200).json({
        message: 'User created Succesfully',
        body: {
            user: {
                name,
                email
            }
        }
    })
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    await pool.query('update users set name = $1, email = $2 where id = $3', [name, email, id]);
    return res.status(200).json(
        `User ${id} updated Succesfully` 
    );
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    await pool.query('delete from users where id = $1', [id]);
    return res.status(200).json(
        `User ${id} deleted Succesfully` 
    );
}
import type { User } from "./commons";

export const users: User[] = []

export const addUser = (id: string, name: string, room: string): { user?: User, error?: string } => {
    const existingUser = users.find(u => u.name.trim().toLowerCase() === name.trim().toLowerCase())

    if (existingUser) return { error: "Username has already been taken" }
    if (!name && !room) return { error: "Username and room are required" }
    if (!name) return { error: "Username is required" }
    if (!room) return { error: "Room is required" }

    const user = { id, name, room }
    users.push(user)
    return { user }
}

export const getUser = (id: string): User | undefined => {
    const user = users.find(u => u.id === id)
    return user
}

export const deleteUser = (id: string): User | void => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) return users.splice(index, 1)[0];
}

export const getUsers = (room: string) => users.filter(user => user.room === room)
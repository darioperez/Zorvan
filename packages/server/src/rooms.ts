export const rooms: string[] = ['off-topic', 'stem', 'mtg'];

export const createRoom = (room: string) => {
    const existingRoom = rooms.find(u => u.trim().toLowerCase() === room.trim().toLowerCase());

    if (existingRoom) return { error: "Username has already been taken" };

    rooms.push(room);
}
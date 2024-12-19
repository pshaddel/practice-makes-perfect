import { getAbout } from "../actions";

export default async function About() {
    const data = await getAbout();
    console.log(data);
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>About Us</h1>
            <p>Welcome to our website. We are dedicated to providing the best service possible.</p>
            <p>{JSON.stringify(data)}</p>
        </div>
    );
}
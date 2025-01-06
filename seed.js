const mongoose  = require('mongoose');

const Product = require('./models/Product');

const products = [
    {
        name: 'Iphone 15pro',
        img: "data:image/jpeg;base64,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",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non consectetur nisi. Nulla facilisi. Sed vulputate, justo at dignissim interdum, justo tortor facilisis purus, vel varius felis felis id dolor. Sed auctor, neque sed semper fermentum, nisi lectus volutpat metus, id tristique felis velit id neque.',
        price: 140000
    },
    {
        name: 'Iphone 15pro',
        img: "data:image/jpeg;base64,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",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non consectetur nisi. Nulla facilisi. Sed vulputate, justo at dignissim interdum, justo tortor facilisis purus, vel varius felis felis id dolor. Sed auctor, neque sed semper fermentum, nisi lectus volutpat metus, id tristique felis velit id neque.',
        price: 140000
    },
    {
        name: 'Iphone 15pro',
        img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMHBhURBxMVDxUVEhYVEBYQFRUXDxUOHhIXFxYdHxgYHCggGRslGxMVIT0iJTU3Li4uGB8zRDU4PSgtLi4BCgoKDg0OGg8QFSsdFR0rLSsrKystNywuKy0rLS0rLS0rMis3LSswLSstLSstKystLSsrKzctKy0tKysrKysrK//AABEIAIsBagMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAYHBQMCAf/EAEQQAQACAQIDBAQICgkFAAAAAAABAgMEEQUSIQYTMUEHYYGxFSJRcXJztNEUIzVCk6KksrPhMjNUYoSRodLwJDRDUlP/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAgED/8QAGxEBAQADAQEBAAAAAAAAAAAAAAECETEhUUH/2gAMAwEAAhEDEQA/ANoAaAAAAAAAAAAAAAAAAAPm94pXe87R6wfQ5PDu0+i4pn5OHarBmtH5uPLSbeyN959jrAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKB6Qtbm/CcuClprhtpa0tWvjOTJnjHaZmP7t1/Ubt3XfUT/ho/a8ScuNjN9JXBvbHqMdLxzTExesTHSdo6T8xrO2mo7L8R5dFOopg2rMWjJ3uGZ26xyZq2rEb9NqzWXJ7TVtwntLlpPSJvN6+ulvjR79vYlcN4lN+m/zon1d98aH2a9JGXiGgrly4Kamk7xNsE9zn5onw7rJa1P1174PxfHxjTTfSc0bTy3pkrNclL+O0x83XeN4nymWZ9jvwfWXvjvE81a88UpEVx7TaI3mY8Zm1/CPXLr4u0ul4B2jjT3nus+Wta8s801tXmt3cTPhE7820TP53rjfZldpsjRBzdPxiuX+lEx83803FqK5f6uYn1ea9xOnqA0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFH7eR+NmfXpvteFeFF9IE7Wt/h/teL7k5cbFW9IPAfhjSxk0v9bjj4sf+9PGa/P5x/NmOizzjvMT028YnxiWu6nXfG6qf2m4HGtmc/D42yeOSsfn+uP73vc8bryrs/Xa9G34zUzePHaI9nfVcDttwHPqe0U5K7T3mSszfeItTlnaJ2nxjlivSN53ifVv3fRlHJw3vL9I5uvsz139zhds+02fTdrN9JaYw45pXuvHvazMxe3Xz3i0dPDaFTviav+k7YYbccpodRPJl23rFqzHW1OetZnw3mNrbeuI8eiyxfaejIbdlcuq7c4cmO0cvfUy3tMW547vadt9tp3rjr5+Mz7dY5mUi0YL95grafOsTPz7Pt4aHro6fRj3Pd0SANAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQvSF1yzHq0/2rEvqh9veus29el+1405Nin8XmcV5cnHrppMrD2mxcsypOa/LaUaVto3ZS1c3C+kRHNGSbbec97197z1nZjHqtTS+WIvNJ3pzVpMxO+/jMb+UeaH2Czc/Doj5K5P4sLRFmFczhHBo0PHs2qjm5s1aRaJmOSJrSaRMee+0u5zPHmOYFu4f/wBjT6Me5IRuG9eH0+hHuSXWIAGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoXbuduIx9LS/bMS+s99IduTXb/ACRpp/a8f3JybHC7WZPjTsz/AFWT40rR2k1/NeVK1Gbe0pg0D0d5N9BP0bfxFuiyiejbJvp7fRt/EXTnGldVNtRtt5zHj/z5EiboXdfjuaJ893rNwXvhf5Ox/Qj3JSJwnrwzH9XX3JbokAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZp6UMnJnv6seCf2mrS2Vely/Lly/UYp/aITWxmnGtbz5J2cXn5t0zR6LLxriEYtBScl58o8IjzmZ8IiPlloHDOx+DgGPvOJWjUZvHb/AMNJ9UT/AEp9c/5M4aQ/R7p7afTTOWJrzUmY36Tt3nSVt53O4dqfwmZt57Wj2d4lzZka9+d+Td48z5m7RpPB+vCcX1dfcmIXBPyPh+qr+7CatIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyP0w2/6vLEf2XF9ohrjM/Sl2b1HEtf32gjvKzpuSabxFpyUvbJERv8vxY9jK2OJ2cmnZ3s9WMURGXLWMma350zMb1r80RO23y7z5uVxDi05pneVe4jx2Kama88dPCJna0dNtpietZjbbaesbOf8JVyW+Las+2E6btcuymr7zNas+VZn9aFimyl9hcGTVcQvbS7XrWn4yImOaInrE7eMx0n/Jb5swek2fM3eU2fHNvbavWZ6REeMy0atwL8i4fqqfuwnIvCsE6bhmKmTxrjpFvpRWN/9UpaQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB85McZaTXLEWifGLRExPsl9AINuDaa8730+CfnxY5n3Pz4D0v9mwfocf+1PAc/4C0vNv+C6ffynuce/7r1+DMEeGHF+jp9yWAi/BuH/44v0dPufWPQ4sV+bFix1mPCa0rEx7YhIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/2Q==",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non consectetur nisi. Nulla facilisi. Sed vulputate, justo at dignissim interdum, justo tortor facilisis purus, vel varius felis felis id dolor. Sed auctor, neque sed semper fermentum, nisi lectus volutpat metus, id tristique felis velit id neque.',
        price: 140000
    },
    {
        name: 'Iphone 15pro',
        img: "data:image/jpeg;base64,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",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non consectetur nisi. Nulla facilisi. Sed vulputate, justo at dignissim interdum, justo tortor facilisis purus, vel varius felis felis id dolor. Sed auctor, neque sed semper fermentum, nisi lectus volutpat metus, id tristique felis velit id neque.',
        price: 140000
    }
]

async function seedDB(){
    await Product.insertMany(products);
    console.log('Database seeded');
}

module.exports = seedDB;
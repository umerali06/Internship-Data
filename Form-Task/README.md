## Running the Application

1. Start the server:
```bash
node server.js
```

2. Open `zts1.html` in your browser or serve it using a local server.

## API Endpoints

### POST /contact
- Sends form data to server
- Saves data to MongoDB
- Sends email notification

Request body:
```json
{
    "name": "Umer Ali",
    "email": "umerali7454@gmail.com",
    "phone": "0318*******",
    "service": "web-dev",
    "message": "Hello, I'm interested in your services."
}
```

### GET /contacts
- Retrieves all contact form submissions
- Returns data sorted by submission date

## Form Features

- Real-time validation
- Loading states during submission
- Success/error notifications
- Automatic form reset after successful submission
- Mobile-responsive design

## Error Handling

The application handles various error scenarios:
- Network errors
- Invalid form data
- Email sending failures
- Database connection issues

## Performance Considerations

- Database and email operations run concurrently
- Loading states provide user feedback
- Form validation prevents unnecessary server requests
- Error messages are user-friendly

## Security Features

- Input validation on both client and server
- Environment variables for sensitive data
- CORS enabled for API access
- Secure email handling with Gmail

## Troubleshooting

Common issues and solutions:

1. Email not sending:
   - Check Gmail credentials in `.env`
   - Verify 2-Step Verification is enabled
   - Ensure correct App Password is used

2. Database connection issues:
   - Verify MongoDB is running
   - Check connection string in `.env`
   - Ensure network access to MongoDB

3. Form submission delays:
   - Check internet connection
   - Verify server is running
   - Check console for error messages

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [umerali7454@gmail.com] or create an issue in the repository.

## Acknowledgments

- Nodemailer for email functionality
- MongoDB for database
- Express.js for server framework
- Tailwind CSS for styling
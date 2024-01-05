# Alexa Generative AI Skill 🤖

## About 📖
Node.js backend for an AWS Lambda function used by the "Generative AI" Alexa Skill. The function utilizes OpenAI's Generative Artificial Intelligence API to generate responses in a natural conversation with the device. 

The goal is to create an interactive and intelligent experience, allowing users to receive dynamic responses to a variety of questions and commands.

## Setup 🛠
### Prerequisites
- AWS account with access to AWS Lambda and Alexa Skills Kit.
- OpenAI account with access to the OpenAI API.

### Configuring the Alexa Skill
1. **Create a new Alexa skill** using the Alexa Skills Kit (ASK). Define the intentions and interaction models as needed.
2. **Implement the skill logic** that will process user inputs and interact with the Lambda function.

### Configuring AWS Lambda
1. **Upload the code from this repository** to your Lambda function.
2. **Set up Lambda trigger** as Alexa/IoT and link your Skill ID.
3. **Copy the Lambda function's ARN** and set it as the endpoint for your Alexa Skill.

### Integration with OpenAI API
1. **Obtain an API key** from OpenAI.
2. **Configure the OpenAI API credentials** in the Lambda function code.

## Testing and Deployment 🚀
- Test the skill using the Alexa test console or an actual Alexa device.

## Limitations and Warnings ⚠️
- **Developer Mode**: This skill is only available in Developer mode, meaning it is not visible or accessible in the Skills Store and is only available for testing.
- **Amazon Account**: If you intend to test with a physical Alexa device (e.g., Amazon Echo, Echo Dot, Echo Show), the email of the Amazon account must be the same as that of the Alexa Skills Kit.
- **Conversation History**: The current version does not support conversation history.
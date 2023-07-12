import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const REGION = "us-east-1";
const sesClient = new SESClient({ region: REGION });

const createSendEmailCommand = (toAddress, fromAddress) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: [
        /* more items */
      ],
      ToAddresses: [
        toAddress,
        /* more To-email addresses */
      ],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: "HTML_FORMAT_BODY desde HTML",
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY desde TEXT",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "EMAIL_SUBJECT",
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};

const run = async () => {
  const sendEmailCommand = createSendEmailCommand(
    "ing.jorgels@icloud.com",
    "jorgels120878@gmail.com"
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (e) {
    console.error("Failed to send email. Error message: ", e.message);
    return e;
  }
};

run();

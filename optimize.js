"use strict";

const AWS = require("aws-sdk");
const sharp = require("sharp");
const { basename, extname } = require("path");

const S3 = new AWS.S3();

module.exports.handle = async ({ Records: records }, context) => {
  try {
    if (!process.env.bucket) {
      throw new Error("Bucket não definido nas variáveis de ambiente.");
    }

    await Promise.all(
      records.map(async (record) => {
        const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));
        const bucket = process.env.bucket;

        console.log(`Processando imagem: ${key} do bucket: ${bucket}`);

        const image = await S3.getObject({
          Bucket: bucket,
          Key: key,
        }).promise();

        const optimized = await sharp(image.Body)
          .resize({ width: 1280, height: 720, fit: "inside" })
          .toFormat("jpeg", { progressive: true, quality: 50 })
          .toBuffer();

        const newKey = `compressed/${basename(key, extname(key))}.jpg`;

        await S3.putObject({
          Body: optimized,
          Bucket: bucket,
          ContentType: "image/jpeg",
          Key: newKey,
        }).promise();

        console.log(`Imagem otimizada salva em: ${newKey}`);
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Imagens processadas com sucesso." }),
    };
  } catch (err) {
    console.error("Erro ao processar imagens:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro ao processar imagens", details: err.message }),
    };
  }
};

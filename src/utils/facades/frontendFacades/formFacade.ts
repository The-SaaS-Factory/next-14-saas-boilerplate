import { Field } from "@/components/core/NewForm";
import { SuperAdminSetting } from "@/interfaces/superAdminModule";
import { saveImage } from "@/utils/facades/serverFacades/mediaFacade";

export const parseSettingDataOnSubmit = async (data: any, fields: any) => {
  try {
    const payload: SuperAdminSetting[] = [];
    const promises = fields.map(async (field: Field) => {
      const fieldName = field.name;
      const fieldValue = data[fieldName];
      let valueFinal: any = fieldValue;

      if (fieldValue !== undefined) {
        if (field.type === "image") {
          // return;
          if (
            fieldValue &&
            fieldValue.length > 0 &&
            typeof fieldValue[0] === "object"
          ) {
            const response = await saveImage(fieldValue[0].data_url);

            if (response) {
              const responseF = await response.json();
              valueFinal = responseF.url;
            }
          }
        } else if (field.type === "textarea") {
          //count all images base64
          const images = fieldValue.match(/data:image\/[^;]+;base64[^"]*/g);
          const imagesCount = images ? images.length : 0;
          //Save each image on server and replace base64 with url
          for (let i = 0; i < imagesCount; i++) {
            //image with base64 structure
            const image = images[i];
            const response = await saveImage(image);
            if (response) {
              const responseF = await response.json();
              valueFinal = fieldValue.replace(image, responseF.url);
            } else {
              valueFinal = fieldValue.replace(image, "");
            }
          }
        } else if (field.type === "file") {
          const response = await saveImage(fieldValue);
          if (response) {
            const responseF = await response.json();
            valueFinal = responseF.url;
          }
        } else if (field.type === "text") {
          valueFinal = fieldValue.toString();
        } else if (field.type === "select" && field.forceInteger) {
          valueFinal = parseInt(fieldValue);
        }
      }
      if (valueFinal !== undefined) {
        payload.push({
          settingName: fieldName,
          settingValue: valueFinal,
        });
      }
    });
    await Promise.all(promises);
    return payload;
  } catch (error) {
    console.log(error);
  }
};

export const parseDataOnSubmit = async (data: any, fields: Field[]) => {
  const payload: any = {};

  const processedData: any = {};

  for (const key in data) {
    if (key.includes("_")) {
      const [fieldName, lang] = key.split("_");
      if (!processedData[fieldName]) {
        processedData[fieldName] = {};
      }
      processedData[fieldName][lang] = data[key];
    } else {
      processedData[key] = data[key];
    }
  }

  const promises = fields.flat().map(async (field: Field) => {
    const fieldName = field.name;
    let fieldValue = processedData[fieldName];

    payload[fieldName] = field.hasLanguageSupport
      ? JSON.stringify(fieldValue)
      : fieldValue;

    if (fieldValue !== undefined) {
      if (field.type === "number") {
        payload[fieldName] = parseFloat(fieldValue);
      } else if (field.type === "file") {
        const response = await saveImage(fieldValue);
        if (response) {
          payload[fieldName] = response.url;
        }
      } else if (field.type === "image") {
        if (typeof fieldValue === "string" && fieldValue.includes("http")) {
          payload[fieldName] = fieldValue;
        } else {
          if (fieldValue && fieldValue.length > 0) {
            const response = await saveImage(
              JSON.stringify((fieldValue[0] as any)?.data_url)
            );
            if (response) {
              payload[fieldName] = response.url;
            } else {
              payload[fieldName] = null;
            }
          }
        }
      } else if (field.type === "gallery") {
        if (fieldValue && fieldValue.length > 0) {
          const images = fieldValue
            .filter((f: any) => f.data_url)
            .map((image: any) => image.data_url);

          if (images.length > 0) {
            const response = await saveImage(JSON.stringify(images));
            let responseF = [response];

            if (response) {
              //Add image on update without data_url
              const imagesUpdate = fieldValue.filter((f: any) => !f.data_url);
              payload[fieldName] = JSON.stringify(
                responseF.concat(imagesUpdate)
              );
            } else {
              payload[fieldName] = null;
            }
          } else {
            payload[fieldName] = JSON.stringify(fieldValue);
          }
        } else {
          payload[fieldName] = JSON.stringify(fieldValue);
        }
        // } else if (field.type === "textarea") {
        //   //count all images base64
        //   const images = fieldValue
        //     ? fieldValue.match(/data:image\/[^;]+;base64[^"]*/g)
        //     : null;
        //   const imagesCount = images ? images.length : 0;
        //   //Save each image on server and replace base64 with url
        //   for (let i = 0; i < imagesCount; i++) {
        //     //image with base64 structure
        //     const image = images[i];

        //     const response = await saveImage(JSON.stringify(image));

        //     if (response) {
        //       const responseF = await response.json();
        //       fieldValue = fieldValue.replace(image, responseF.url);
        //     } else {
        //       fieldValue = fieldValue.replace(image, "");
        //     }
        //   }
        //   payload[fieldName] = fieldValue;
      } else if (field.type === "searchselect" && field.forceInteger) {
        payload[fieldName] = parseInt(fieldValue);
      } else if (field.type === "select" && field.forceInteger) {
        payload[fieldName] = parseInt(fieldValue);
      } else if (field.type === "date") {
        const localDate = new Date(fieldValue + "T00:00:00");

        // Verificar si el objeto Date se creó correctamente
        if (!isNaN(localDate.getTime())) {
          // Asignar la fecha local al payload
          payload[fieldName] = localDate;
        } else {
          // Manejar el caso en el que la fecha no es válida
          console.error("Fecha no válida");
        }
      } else if (field.type === "multiselect") {
        if (fieldValue && fieldValue.length > 0) {
          payload[fieldName] = JSON.stringify(fieldValue);
        } else {
          payload[fieldName] = null;
        }
      }
    }
  });

  await Promise.all(promises);

  return payload;
};

try {
    // Extract envelopeId from function arguments
    const envelopeId = args[0]; // First argument is envelopeId
    const token = "eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwCA499TJT_dSAgAgEuktS0_3UgCAHysz9S-F_lIjfdEdcrjvhsVAAEAAAAYAAIAAAAFAAAAHQAAAA0AJAAAADI5MWZjZjU1LThkMmItNDFiMi1iNjU3LWI5ZDdmNTNiMTNmZSIAJAAAADI5MWZjZjU1LThkMmItNDFiMi1iNjU3LWI5ZDdmNTNiMTNmZRIAAQAAAAYAAABqd3RfYnIjACQAAAAyOTFmY2Y1NS04ZDJiLTQxYjItYjY1Ny1iOWQ3ZjUzYjEzZmU.0QrplgEL4lJPMTqR-MgBT8QuRXdYTjwl_KWDBwagmqsTC0-Dy_pyE6TplCCRQr7Sh8mePb5FkQhq9cQuf1T09SLdubxs-cUXZhtxuiLTpQ63_0Ziu2GB0Ln6n1UsGF6oZdD2J8EtZb6GicMZiCW5YI1TNWaKKfimsBuI_P--iJOMltu04HUvJuIbybgNwmMM5H4_ezo0Ib6pT67SyVxV166mHIJhJxA6D0fkfYhfOu9ZwjU9pSFlsuxqRs1rBGMe6KJMeIqSK9ncLgjPH8fjQrEOK9002eD98ffi_uXeMV8EaBI9kK6vC7p0V4oteqvv0t9f-5mo5hANl1TrvhSygg"
  
    if (!accountId || !envelopeId) {
      throw Error("Missing accountId or envelopeId in function arguments");
    }
  
    const apiResponse = await Functions.makeHttpRequest({
      url: `https://demo.docusign.net/restapi/v2.1/accounts/2fa451b0-6fef-4cdf-bf75-163234a67ef8/envelopes/${envelopeId}/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (apiResponse.error) {
      throw Error("Request failed: " + JSON.stringify(apiResponse.error));
    }
  
    const { data } = apiResponse;
  
    if (!data || !data.status) {
      throw Error("Response does not contain the expected status field");
    }
  
    const status = data.status.toLowerCase(); // Ensure it's case-insensitive
  
    // Return true if status is "completed", otherwise return false
    return Functions.encodeUint256(status === "completed" ? 1 : 0);
  } catch (error) {
    console.error("An error occurred:", error.message);
    throw error;
  }
  
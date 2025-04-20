// This is a mock API service for demonstration purposes
// In a real application, this would connect to your backend API

interface UploadXrayParams {
  image: File
  age: number
  gender: string
}

export async function uploadXray(params: UploadXrayParams): Promise<any> {
  // In a real application, you would use Axios to send the data to your API
  // const formData = new FormData();
  // formData.append('image', params.image);
  // formData.append('age', params.age.toString());
  // formData.append('gender', params.gender);

  // const response = await axios.post('/api/analyze-xray', formData, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //   },
  // });

  // return response.data;

  // For demo purposes, we'll simulate an API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "X-ray analysis completed successfully",
      })
    }, 2000)
  })
}

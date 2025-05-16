const BASE_URL = 'http://localhost:8080/HK_APP'; // 替换为你的Java后端接口地址

export const login = (data) => uni.request({ url: `${BASE_URL}/api/login`, method: 'POST', data });
export const getUserInfo = (data) => uni.request({ url: `${BASE_URL}/api/users/info/${id}`, method: 'GET', data });
export const addUser = (data) => uni.request({ url: `${BASE_URL}/api/users/add`, method: 'POST', data });
export const deleteUser = (id) => uni.request({ url: `${BASE_URL}/api/users/delete/${id}`, method: 'DELETE' });
export const updateUser = (data) => uni.request({ url: `${BASE_URL}/api/users/update/${id}`, method: 'PUT', data });
export const queryUser = (data) => uni.request({ url: `${BASE_URL}/api/users/query`, method: 'GET', data });
export const addService = (data) => uni.request({ url: `${BASE_URL}/api/services/add`, method: 'POST', data });
export const deleteService = (id) => uni.request({ url: `${BASE_URL}/api/services/delete/${id}`, method: 'DELETE' });
export const updateService = (data) => uni.request({ url: `${BASE_URL}/api/services/update/${id}`, method: 'PUT', data });
export const queryService = (data) => uni.request({
  url: `${BASE_URL}/api/services/query`,
  method: 'POST',
  data: JSON.stringify(data), // 将数据转换为JSON字符串
  header: {
    'content-type': 'application/json' // 设置请求头为JSON
  }
  });
export const queryHotService = (data) => uni.request({
  url: `${BASE_URL}/api/services/query/hot`,
  method: 'POST',
  data: JSON.stringify(data), // 将数据转换为JSON字符串
  header: {
    'content-type': 'application/json' // 设置请求头为JSON
  }
});
export const infoService = (data) => uni.request({ url: `${BASE_URL}/api/services/info/${id}`, method: 'GET', data});
export const addEvaluate = (data) => uni.request({ url: `${BASE_URL}/api/evaluate/add`, method: 'POST', data });
export const queryEvaluate = (data) => uni.request({ url: `${BASE_URL}/api/evaluate/query`, method: 'GET', data });
export const deleteEvaluate = (id) => uni.request({ url: `${BASE_URL}/api/evaluate/delete/${id}`, method: 'DELETE'});
export const updateEvaluate = (data) => uni.request({ url: `${BASE_URL}/api/evaluate/update/${id}`, method: 'PUT', data });
export const addMember = (data) => uni.request({ url: `${BASE_URL}/api/member/add`, method: 'POST', data });
export const queryMember = (data) => uni.request({ url: `${BASE_URL}/api/member/query`, method: 'GET', data });
export const deleteMember = (id) => uni.request({ url: `${BASE_URL}/api/member/delete/${id}`, method: 'DELETE'});
export const updateMember = (data) => uni.request({ url: `${BASE_URL}/api/member/update/${id}`, method: 'PUT', data });
export const infoMember = (data) => uni.request({ url: `${BASE_URL}/api/member/info/${id}`, method: 'GET', data});
export const addOrder = (data) => uni.request({ url: `${BASE_URL}/api/order/add`, method: 'POST', data });
export const queryOrder = (data) => uni.request({ url: `${BASE_URL}/api/order/query`, method: 'GET', data });
export const deleteOrder = (id) => uni.request({ url: `${BASE_URL}/api/order/delete/${id}`, method: 'DELETE'});
export const updateOrder = (data) => uni.request({ url: `${BASE_URL}/api/order/update/${id}`, method: 'PUT', data });

// 检查并创建文件
const fs = wx.getFileSystemManager();
const logDirPath = `${wx.env.USER_DATA_PATH}/miniprogramLog`;
const logFiles = ['interstitialAdExtInfo', 'log2', 'log3'];

// 创建目录
fs.access({
    path: logDirPath,
    success: () => {
        console.log('Directory exists');
        checkAndCreateFiles();
    },
    fail: () => {
        console.log('Directory does not exist, creating it');
        fs.mkdir({
            dirPath: logDirPath,
            success: () => {
                console.log('Directory created successfully');
                checkAndCreateFiles();
            },
            fail: err => {
                console.error('Failed to create directory', err);
            }
        })
		},
		});
		function checkAndCreateFiles() {
		    logFiles.forEach(logFile => {
		        const logFilePath = `${logDirPath}/${logFile}`;
		        fs.access({
		            path: logFilePath,
		            success: () => {
		                console.log(`${logFile} exists`);
		            },
		            fail: () => {
		                console.log(`${logFile} does not exist, creating it`);
		                fs.writeFile({
		                    filePath: logFilePath,
		                    data: '',
		                    success: res => {
		                        console.log(`${logFile} created successfully`);
		                    },
		                    fail: err => {
		                        console.error(`Failed to create ${logFile}`, err);
		                    }
		                });
		            },
					});
					})
					}
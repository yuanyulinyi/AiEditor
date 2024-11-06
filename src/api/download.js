import request from '@/utils/request'

// 下载方法
export function download(url, filename) {
    return request({
        url: url,
        responseType: 'blob',
        method: 'post'
    }).then((response) => {
        try {
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Download error', error);
        }
    }).catch((error) => {
        console.error('Request error', error);
    });
}

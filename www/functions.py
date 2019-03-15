#import gevent.monkey
#gevent.monkey.patch_all()
#
#import grequests
#import json
#import cchardet
#import gevent

#
#from requests.packages.urllib3.util.ssl_ import create_urllib3_context
#create_urllib3_context()
#import bittrex_socket

def get_async_web_response(url, method='GET', data=None, headers=None):
    if 'POST' == method:
        request = grequests.post(url, data=data, headers=headers)
    elif 'PUT' == method:
        request = grequests.put(url, data=data, headers=headers)
    elif 'PATCH' == method:
        request = grequests.patch(url, data=data, headers=headers)
    else:
        request = grequests.get(url, data=data, headers=headers)
    request = grequests.map([request])
    if request[0].encoding is None:
        request[0].encoding = cchardet.detect(request[0].content)['encoding']
    response = json.loads(request[0].text)
    return response


def get_async_web_response_no_decode(url, method='GET', data=None, headers=None):
    if 'POST' == method:
        request = grequests.post(url, data=data, headers=headers)
    elif 'PUT' == method:
        request = grequests.put(url, data=data, headers=headers)
    elif 'PATCH' == method:
        request = grequests.patch(url, data=data, headers=headers)
    else:
        request = grequests.get(url, data=data, headers=headers)
    request = grequests.map([request])
    if request[0].encoding is None:
        request[0].encoding = cchardet.detect(request[0].content)['encoding']
    response = request[0]
    return response


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

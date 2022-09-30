import socketserver
import http.server
import ssl

httpd = socketserver.TCPServer(('localhost', 9000), http.server.SimpleHTTPRequestHandler)

httpd.socket = ssl.wrap_socket(httpd.socket, 
                               certfile='ssl-cert/cert.pem',
                               keyfile='ssl-cert/key.pem',
                               server_side=True)

httpd.serve_forever()
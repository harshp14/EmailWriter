import http.server
import socketserver
#import openai

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    #APIKEY = "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"
    #openai.organization = "org-xn9INTDZvZTMow9VvxtaayoD"
    #openai.api_key = APIKEY

    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods','GET,POST,PATCH,OPTIONS')
        self.end_headers()

        url = self.path
        url = url[url.find("userprompt:") + 11:]
        url = url.replace("%20", " ")

        #Send whatever inputs were supplied to a database table

        #response = openai.Completion.create(model="text-davinci-003", prompt=url, temperature=0, max_tokens=2000)
        #self.wfile.write(bytes(response.choices[0].text, "utf8"))
        self.wfile.write(bytes(url, "utf8"))

handler_object = MyHttpRequestHandler
PORT = 8001
my_server = socketserver.TCPServer(("", PORT), handler_object)
my_server.serve_forever()
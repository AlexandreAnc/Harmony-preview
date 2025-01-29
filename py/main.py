import requests
from base64 import b64encode
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/search_track/*": {"origins": "*"}})



def get_spotify_auth_token(client_id, client_secret):
    """
    Obtient le token d'authentification Spotify.

    Paramètres :
    client_id (str) : ID client Spotify
    client_secret (str) : Secret client Spotify

    Retour :
    str : Token d'authentification Spotify
    """

    client_creds = f"{client_id}:{client_secret}"
    client_creds_b64 = b64encode(client_creds.encode()).decode()


    headers = {
        "Authorization": f"Basic {client_creds_b64}"
    }


    data = {
        "grant_type": "client_credentials"
    }


    auth_url = "https://accounts.spotify.com/api/token"
    response = requests.post(auth_url, headers=headers, data=data)

    if response.status_code == 200:
        print(f"Réponse trouvée, renvoie : {response}")
        return response.json().get("access_token")
    else:
        return None


def search_spotify_tracks(track_name, auth_token):
    """
    Recherche un titre de piste sur Spotify.

    Paramètres :
    track_name (str) : Nom du titre à rechercher.
    auth_token (str) : Token d'autorisation pour l'API Spotify.

    Retour :
    dict : Résultats de recherche de Spotify.
    """

    search_url = "https://api.spotify.com/v1/search/"


    headers = {
        "Authorization": f"Bearer {auth_token}"
    }


    search_params = {
        "q": track_name,
        "type": "track",
        "limit": 1
    }

    response = requests.get(search_url, headers=headers, params=search_params)
    print(response.json)

    if response.status_code == 200:
        tracks_data = response.json()
        for track in tracks_data['tracks']['items']:

            artist_name = track['artists'][0]['name']

            album_cover_url = track['album']['images'][0]['url']
            print(f"Artiste : {artist_name}, Cover : {album_cover_url}")

        return response.json()
    else:
        print(f"Erreur de l'API Spotify: {response.json()}")
        return {"error": response.json().get('error', {}).get('message', 'Erreur inconnue')}

@app.route('/search_track', methods=['GET'])
def search_track():
    track_name = request.args.get('track')
    client_id = 'PRIVATE'
    client_secret = 'PRIVATE'
    print(f"Artist de la première fonction {track_name}")
    auth_token = get_spotify_auth_token(client_id, client_secret)
    print(auth_token)
    print()
    if auth_token:
        search_results = search_spotify_tracks(track_name, auth_token)
        return jsonify(search_results)
    else:
        return jsonify({"error": "Échec de l'authentification avec Spotify"})



if __name__ == '__main__':
    app.run(debug=True)

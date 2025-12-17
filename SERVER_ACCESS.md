# Доступы к серверу 88.218.121.213

## SSH
- **IP:** 88.218.121.213
- **User:** root
- **Команда:** `ssh root@88.218.121.213`

---

## VPN Сервисы

### 1. Outline VPN ✅
- **Статус:** Работает
- **Management Key:**
```json
{"apiUrl":"https://88.218.121.213:37375/rQ8eWVlqpfT2LoIa_4VGRQ","certSha256":"51CAE6A9E60CA22C3B4B68F28525ADEB236456BE9691E2925A0408126E0CF108"}
```
- **Порты:** 
  - TCP: 37375 (управление)
  - TCP/UDP: 26144 (VPN)

### 2. Pritunl VPN (OpenVPN) ✅
- **URL:** https://88.218.121.213:9443
- **Username:** pritunl
- **Password:** z0q37maU46zg
- **Setup Key:** 65112339eb2a40d7a77e5a9482a78ef7
- **Организация:** LK
- **Пользователь:** vpn
- **Порт VPN:** 1194/udp
- **Для роутера:** Скачать .ovpn файл из веб-интерфейса

---

## Управление и Сервисы

### Easypanel
- **URL:** http://88.218.121.213:3000
- **Статус:** Работает
- **Назначение:** Управление Docker контейнерами, деплой приложений

### Supabase
- **URL:** https://baze-supabase.crv1ic.easypanel.host/
- **Dashboard Username:** supabase
- **Dashboard Password:** this_password_is_insecure_and_should_be_updated
- **Статус:** Работает
- **Сервисы:** PostgreSQL, PostgREST, GoTrue, Realtime, Storage, Kong, Studio

### n8n
- **Статус:** Работает
- **Назначение:** Автоматизация и интеграции

---

## Docker Контейнеры

### Активные контейнеры:
```bash
# Просмотр всех контейнеров
docker ps

# Логи контейнера
docker logs <container_name>

# Перезапуск контейнера
docker restart <container_name>
```

**Запущенные сервисы:**
- outline (Outline VPN)
- pritunl (Pritunl VPN)
- easypanel
- supabase (множество контейнеров)
- n8n

---

## Полезные команды

### Управление Docker
```bash
# Список контейнеров
docker ps -a

# Остановить контейнер
docker stop <container_name>

# Удалить контейнер
docker rm <container_name>

# Просмотр логов
docker logs -f <container_name>

# Перезапуск
docker restart <container_name>
```

### Системная информация
```bash
# Использование диска
df -h

# Использование памяти
free -h

# Процессы
htop

# Сетевые подключения
netstat -tulpn
```

---

## Настройка роутера Keenetic для VPN

1. Установить компонент **OpenVPN-клиент**
2. Скачать `.ovpn` файл из Pritunl (https://88.218.121.213:9443)
3. В роутере: **Интернет** → **Другие подключения** → **VPN-подключения**
4. Добавить подключение → OpenVPN → Загрузить файл конфигурации
5. Включить опцию "Использовать для выхода в интернет"
6. Применить и подключиться

---

## Резервное копирование

### Важные директории:
- `~/pritunl/` - данные Pritunl
- `~/openvpn-ui-data/` - данные OpenVPN (удалено)
- Easypanel и Supabase управляются через Docker volumes

### Создание бэкапа:
```bash
# Бэкап Pritunl
tar -czf pritunl-backup-$(date +%Y%m%d).tar.gz ~/pritunl/

# Скачать на локальный компьютер
scp root@88.218.121.213:~/pritunl-backup-*.tar.gz ~/Downloads/
```

---

## Безопасность

⚠️ **Рекомендации:**
1. Сменить пароль Pritunl (текущий: z0q37maU46zg)
2. Сменить пароль Supabase Dashboard
3. Настроить firewall (ufw) - сейчас отключен
4. Регулярно обновлять систему: `apt update && apt upgrade`
5. Настроить автоматические бэкапы

---

## Контакты и поддержка

- **Провайдер сервера:** hoztnode.net
- **ОС:** Ubuntu 24.04 LTS
- **Docker:** Установлен
- **Firewall:** Отключен (ufw disabled)

---

**Дата создания:** 17 декабря 2025
**Последнее обновление:** 17 декабря 2025

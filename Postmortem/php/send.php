<?
if((isset($_POST['name'])&&$_POST['name']!="")&&(isset($_POST['phone'])&&$_POST['phone']!="")){ //�������� ����������� �� ���� ���� name � �� ������ �� ���
        $to = 'mr.dorick@yandex.ru'; //����� ����������, ����� ������� ����� ������� ������� ������ �������
        $subject = '�������� ������'; //��������� ���������
        $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>���: '.$_POST['name'].'</p>
                        <p>�������: '.$_POST['phone'].'</p>                        
                    </body>
                </html>'; //����� ������ ��������� ����� ������������ HTML ����
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //��������� ������
        $headers .= "From: ����������� <from@example.com>\r\n"; //������������ � ����� �����������
        mail($to, $subject, $message, $headers); //�������� ������ � ������� ������� mail
}
?>
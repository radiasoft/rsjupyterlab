# -*- coding: utf-8 -*-
u"""rsjupyterlab setup script

:copyright: Copyright (c) 2022 RadiaSoft LLC.  All Rights Reserved.
:license: http://www.apache.org/licenses/LICENSE-2.0.html
"""
from pykern import pksetup

pksetup.setup(
    name='rsjupyterlab',
    author='RadiaSoft LLC',
    author_email='pip@radiasoft.net',
    description='jupyterlab extensions',
    install_requires=[
        'pykern',
    ],
    license='http://www.apache.org/licenses/LICENSE-2.0.html',
    url='https://github.com/radiasoft/rsjupyterlab',
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'Environment :: Console',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: Apache Software License',
        'Natural Language :: English',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python',
        'Topic :: Utilities',
    ],
)

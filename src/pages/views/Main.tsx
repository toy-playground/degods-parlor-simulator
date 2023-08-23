import { Dialog, Transition } from '@headlessui/react';
import { Disclosure } from '@headlessui/react';
import Image from 'next/image';
import * as React from 'react';

import { Input } from '@/components/Input';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

import {
  bgBase,
  borderBaseInner,
  primaryButton_1,
  textBase,
  textSecondaryContrast,
  viewWrapper,
} from '@/styles';

import DiamondSvg from '~/svg/diamond.svg';
import DustSvg from '~/svg/dust-coin-gold.svg';
const footerClass = ` ${textSecondaryContrast} font-apercu absolute bottom-[30px] my-[0px] w-full items-center justify-between px-[20px] sm:px-[34px] flex `;

export const Divider = ({ className }: { className?: string }) => {
  return (
    <div
      className={`m-4 h-0 w-full border-b-[0.5px] ${borderBaseInner} ${className}`}
    ></div>
  );
};

const PRIZE_MAP: Record<string, Record<string, number>> = {
  'pack-A': {
    '0 DUST': 7380,
    '3.3 DUST': 2000,
    '5 DUST': 300,
    '10 DUST': 200,
    '33 DUST': 100,
    '??? PRIZE': 20,
  },
  'pack-B': {
    '0 DUST': 8030,
    '3.3 DUST': 1300,
    '5 DUST': 400,
    '10 DUST': 200,
    '100 DUST': 50,
    '??? PRIZE': 20,
  },
  'pack-C': {
    '0 DUST': 8755,
    '3.3 DUST': 900,
    '5 DUST': 200,
    '10 DUST': 100,
    '333 DUST': 25,
    '??? PRIZE': 20,
  },
};

export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <Seo />
      <main
        className={`${bgBase} ${textBase} font-circular transition-colors duration-300`}
      >
        <section className={`relative min-h-screen `}>
          <header className='absolute left-0 right-0 top-0 z-50  h-[116px]  md:h-[94px]'>
            <div className='mx-[20px] my-[26px] flex items-center justify-between sm:mx-[34px]'>
              <UnstyledLink
                href='/'
                openNewTab={false}
                className='flex items-center gap-2 text-lg font-bold text-white transition-all hover:text-gray-400'
              >
                <DiamondSvg className='h-[32px] w-[32px] ' />
                Parlor Simulator
              </UnstyledLink>
            </div>
          </header>
          <div className={viewWrapper}>{children}</div>
          <footer className={footerClass}>
            <UnstyledLink
              href='https://twitter.com/__ababa___'
              openNewTab={true}
            >
              ©2023 All rights reserved. author:ttu
            </UnstyledLink>
          </footer>
        </section>
      </main>
    </Layout>
  );
};

const generatePool = (pack: string) => {
  const prize = PRIZE_MAP[pack] as Record<string, number>;
  const pool = Object.entries(prize).reduce((acc, [key, value]) => {
    return [...acc, ...Array(value).fill(key)];
  }, [] as string[]);
  return pool;
};

const parsePrizeIntoResult = (prize: string[]) => {
  const dustPrize = Number(
    prize
      .filter((p) => p.includes('DUST'))
      .reduce((acc, cur) => acc + Number(cur.split(' ')[0]), 0)
      .toFixed(1)
  );
  const otherPrize = prize.filter((p) => !p.includes('DUST')).length;
  return [dustPrize, otherPrize];
};

export default function MainView() {
  const [inputValue, setInputValue] = React.useState<Record<string, number>>({
    'pack-A': 1,
    'pack-B': 2,
    'pack-C': 3,
  });
  const total = Object.values(inputValue).reduce((acc, cur) => acc + cur, 0);

  const [isOpen, setIsOpen] = React.useState(false);
  const [currentResult, setCurrentResult] = React.useState<
    Record<string, string[]>
  >({});

  const simulate = () => {
    const result: Record<string, string[]> = {
      'pack-A': [],
      'pack-B': [],
      'pack-C': [],
    };
    ['pack-A', 'pack-B', 'pack-C'].forEach((pack) => {
      const pool = generatePool(pack);
      for (let i = 0; i < inputValue[pack]; i++) {
        const index = Math.floor(Math.random() * pool.length);
        result[pack].push(pool[index]);
      }
    });

    setCurrentResult(result);
    setIsOpen(true);
  };

  return (
    <BaseLayout>
      <div className='flex w-full select-none flex-col items-center gap-5 overflow-hidden 2xl:gap-10'>
        <div className='font-apercu text-xl font-bold'>Pack Details</div>
        <div className='relative flex w-full flex-wrap items-center justify-center gap-4'>
          {['pack-A', 'pack-B', 'pack-C'].map((pack) => {
            const prize = PRIZE_MAP[pack] as Record<string, number>;
            return (
              <div
                className='relative flex flex-col  gap-1 overflow-clip rounded-xl border-2 pb-4'
                key={'prize' + pack}
                style={{ width: '200px' }}
              >
                <div className='flex w-full items-center gap-2 px-3 pt-3'>
                  <div className='flex w-full flex-col'>
                    <div className='font-bold'>{pack}</div>
                    <div className='text-fontSecondary divide-y divide-gray-600 pt-4 text-xs'>
                      {Object.entries(prize).map(([key, value]) => {
                        return (
                          <div
                            className='flex w-full items-center justify-between py-[10px]'
                            key={pack + key}
                          >
                            <div>{key}</div>
                            <div>{value / 100 + '%'}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className='font-apercu text-xl font-bold'>Simulator</div>
        <div className='relative flex w-full flex-wrap items-center justify-center gap-4'>
          {['pack-A', 'pack-B', 'pack-C'].map((pack) => {
            return (
              <div
                className='bg-card relative flex h-full w-full 
            flex-col justify-end overflow-clip rounded-2xl'
                key={pack}
                style={{ width: '200px', height: '328px' }}
              >
                <Image
                  src={`/images/${pack}.png`}
                  alt={pack}
                  width={500}
                  height={500}
                  priority
                  className={`absolute top-0 h-full w-full rounded-2xl
               drop-shadow-2xl`}
                  style={{
                    objectFit: 'contain',
                  }}
                />
                <div className='relative z-10 p-[10px]'>
                  <div>Enter Packs Count</div>
                  <Input
                    value={inputValue[pack].toString()}
                    onChange={(v) =>
                      setInputValue({
                        ...inputValue,
                        [pack]:
                          v && !isNaN(Number(v))
                            ? Math.max(0, Math.min(Number(v), 1000))
                            : 0,
                      })
                    }
                    placeholder='0'
                  />
                </div>
              </div>
            );
          })}
        </div>

        <button
          className={`${primaryButton_1} rounded-md font-bold`}
          onClick={() => {
            simulate();
          }}
          disabled={total <= 0}
        >
          {`Open ${total} Packs`}
        </button>
      </div>
      <Transition show={isOpen} as={React.Fragment}>
        <Dialog onClose={() => setIsOpen(false)} className='relative z-50'>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/50' aria-hidden='true' />
          </Transition.Child>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='fixed inset-0 flex items-center justify-center p-4'>
              <Dialog.Panel className='rounded-8 flex max-h-[90%] w-full max-w-[600px] flex-col items-center overflow-y-auto rounded bg-black p-[32px] text-white md:p-[64px]'>
                <div className=' text-center text-lg font-bold'>
                  Simulator Result
                </div>
                <div className='text-fontSecondary w-full divide-y divide-gray-600 pt-4'>
                  {['pack-A', 'pack-B', 'pack-C'].map((pack) => {
                    const [dust, other] = currentResult[pack]
                      ? parsePrizeIntoResult(currentResult[pack])
                      : [0, 0];
                    if (
                      !currentResult[pack] ||
                      currentResult[pack].length === 0
                    )
                      return null;
                    return (
                      <div key={pack} className='w-full text-white'>
                        <Disclosure>
                          <Disclosure.Button className='flex w-full items-center justify-between py-4'>
                            <div>{pack}</div>
                            <div className='flex items-center'>
                              {dust}
                              <DustSvg />
                              {other ? ' + ' + other + ' * ??? PRIZE' : ''}
                            </div>
                          </Disclosure.Button>
                          <Disclosure.Panel className='text-gray-500'>
                            {currentResult[pack].map((prize, index) => {
                              return currentResult[pack].length > 50 &&
                                prize === '0 DUST' ? null : (
                                <div
                                  className='flex w-full items-center justify-between pb-[6px] text-gray-600'
                                  style={
                                    prize === '??? PRIZE'
                                      ? { color: 'orange' }
                                      : {}
                                  }
                                  key={pack + index}
                                >
                                  <div>Pack {index + 1}</div>
                                  <div>{prize}</div>
                                </div>
                              );
                            })}
                          </Disclosure.Panel>
                        </Disclosure>
                      </div>
                    );
                  })}
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </BaseLayout>
  );
}

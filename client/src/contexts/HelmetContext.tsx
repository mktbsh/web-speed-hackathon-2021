import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

type HelmetState = {
  title?: string;
  canonical?: string;
  customLinkTags?: Record<string, string>[];
};

const defaultState: HelmetState = {
  title: 'CAwitter',
};

const SetHelmetStateContext = React.createContext<Dispatch<SetStateAction<HelmetState>>>(() => {});

export const useSetHelmet = ({ title, canonical, customLinkTags }: HelmetState) => {
  const setState = useContext(SetHelmetStateContext);

  React.useEffect(() => {
    setState({
      title: title ? `${title} - CAwitter` : 'CAwitter',
      canonical,
      customLinkTags,
    });
  }, [title, canonical, customLinkTags, setState]);
};

type Props = {
  initialState?: HelmetState;
  children: React.ReactNode;
};

export const HelmetStateProvider = ({ initialState, children }: Props) => {
  const [state, setState] = useState<HelmetState>(initialState ?? defaultState);
  const tags = [];
  if (state.customLinkTags && state.customLinkTags.length > 0) {
    tags.push(state.customLinkTags.map(({ key, ...tagProps }, i) => <link key={`link-${key || i}`} {...tagProps} />));
  }

  return (
    <SetHelmetStateContext.Provider value={setState}>
      <HelmetProvider>
        <Helmet>
          {state.title && <title>{state.title}</title>}
          {state.canonical && <link rel="canonical" href={state.canonical} />}
          {tags}
        </Helmet>
      </HelmetProvider>
      {children}
    </SetHelmetStateContext.Provider>
  );
};

import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

type HelmetState = {
  title?: string;
  canonical?: string;
  customLinkTags?: Record<string, string>[];
  description?: string;
};

const defaultState: HelmetState = {
  title: 'CAwitter',
  description: 'Web Speed Hackathon 2021',
};

const SetHelmetStateContext = React.createContext<Dispatch<SetStateAction<HelmetState>>>(() => {});

export const useSetHelmet = ({ title, canonical, customLinkTags, description }: HelmetState) => {
  const setState = useContext(SetHelmetStateContext);

  React.useEffect(() => {
    setState({
      title: title ? `${title} - CAwitter` : 'CAwitter',
      description,
      canonical,
      customLinkTags,
    });
  }, [title, canonical, customLinkTags, setState, description]);
};

type Props = {
  initialState?: HelmetState;
  children: React.ReactNode;
};

export const HelmetStateProvider = ({ initialState, children }: Props) => {
  const [state, setState] = useState<HelmetState>(initialState ?? defaultState);
  const tags = [];

  if (state.description) {
    tags.push(<meta key="description" name="description" content={state.description.substr(0, 150)} />);
  }

  if (state.canonical) {
    tags.push(<link key="canonical" rel="canonical" href={state.canonical} />);
  }

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
